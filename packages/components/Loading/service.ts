import { delay, isNil, isString } from "lodash-es";
import type { LoadingOptions, LoadingOptionsResolved } from "./types";
import { useZIndex } from "@hangui/hooks";
import { createApp, nextTick, reactive, ref } from "vue";
import LoadingComp from "./Loading.vue";
const LOADING_NUMB_KEY = "h-loading-numb" as const;
//这两个类名要动态的添加到loading组件上
const RELATIVE_CLASS = "er-loading-parent--relative" as const;
const HIDDEN_CLASS = "er-loading-parent--hiden" as const;
const { nextZIndex } = useZIndex(3000);
//保存所有loading实例<挂载的目标dom节点，loading实例>
const instanceMap: Map<HTMLElement, LoadingInstance> = new Map();
//添加相对定位类名
function addRelativeClass(target: HTMLElement = document.body) {
  target.classList.add(RELATIVE_CLASS);
}
//删除相对定位类名
function removeRelativeClass(target: HTMLElement = document.body) {
  target.classList.remove(RELATIVE_CLASS);
}
//添加隐藏类名
function addHiddenClass(target: HTMLElement = document.body) {
  target.classList.add(HIDDEN_CLASS);
}
//删除隐藏类名
function removeHiddenClass(target: HTMLElement = document.body) {
  target.classList.remove(HIDDEN_CLASS);
}
// 获取指定DOM元素上的loading数量
function getLoadingNumb(target: HTMLElement = document.body) {
  return target.getAttribute(LOADING_NUMB_KEY);
}
// 增加指定DOM元素上的loading数量
function addLoadingNumber(target: HTMLElement = document.body) {
  const numb = getLoadingNumb(target) ?? "0";
  target.setAttribute(LOADING_NUMB_KEY, `${Number.parseInt(numb) + 1}`);
}
//移除指定DOM元素上的loading属性
function removeLoadingNumb(target: HTMLElement = document.body) {
  target.removeAttribute(LOADING_NUMB_KEY);
}
//减少指定DOM元素上的loading数量
function subtLoadingNumb(target: HTMLElement = document.body) {
  const numb = getLoadingNumb(target);
  if (numb) {
    const newNumb = Number.parseInt(numb) - 1;
    if (newNumb === 0) {
      removeLoadingNumb(target);
    } else {
      target.setAttribute(LOADING_NUMB_KEY, `${newNumb}`);
    }
  }
}
//根据传入的配置和目标挂载dom元素添加类名
function addClass(
  options: LoadingOptions,
  parent: HTMLElement = document.body
) {
  if (options.lock) {
    addHiddenClass(parent);
  } else {
    removeHiddenClass(parent);
  }

  addRelativeClass(parent);
}

function createLoading(opts: LoadingOptionsResolved) {
  const visible = ref(opts.visible);
  const afterLeaveFlag = ref(false);
  const handleAfterLeave = () => {
    if (!afterLeaveFlag.value) return;
    destory();
  };
  const data = reactive({
    ...opts,
    onAfterLeave: handleAfterLeave,
  });
  const app = createApp(LoadingComp, {
    ...data,
    zIndex: data.fullscreen ? nextZIndex() : void 0,
    visible,
  });
  // 创建一个新的div元素作为挂载点，并将Vue应用实例挂载到该元素上
  const vm = app.mount(document.createElement("div"));
  const destory = () => {
    const target = data.parent;
    subtLoadingNumb(target);
    if (getLoadingNumb(target)) return;
    delay(() => {
      removeRelativeClass(target);
      removeHiddenClass(target);
    }, 1);
    instanceMap.delete(target ?? document.body);
    vm.$el?.parentNode?.removeChild(vm.$el);
    app.unmount();
  };
  const setText = (text: string) => (data.text = text);

  let afterLeaveTimer: number;
  const close = () => {
    if (opts.beforeClose && !opts.beforeClose()) return;
    afterLeaveFlag.value = true;
    clearTimeout(afterLeaveTimer);
    afterLeaveTimer = delay(handleAfterLeave, 500);

    visible.value = false;
    opts.closed?.();
  };
  return {
    get $el(): HTMLElement {
      return vm.$el;
    },
    vm,
    close,
    visible,
    setText,
  };
}
export type LoadingInstance = ReturnType<typeof createLoading>;
//整理和初始化组件配置
function resolveOptions(options: LoadingOptions): LoadingOptionsResolved {
  //这个loading组件挂载的目标dom节点可能是body或者是v-loading指令所在的dom元素
  let target: HTMLElement;
  //传入字符串则代表选择器，否则就是dom元素
  if (isString(options.target)) {
    target = document.querySelector(options.target) ?? document.body;
  } else {
    target = options.target || document.body;
  }
  return {
    parent: target === document.body || options.body ? document.body : target,
    background: options.background ?? "rgba(0, 0, 0, 0.5)",
    spinner: options.spinner,
    text: options.text,
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: options.lock ?? false,
    visible: options.visible ?? true,
    target,
  };
}

//全屏实例只有一个（单例模式）
let fullscreenInstance: LoadingInstance | null = null;
//实现函数式的方式挂载到dom上
export function Loading(options: LoadingOptions = {}): LoadingInstance {
  //整理和初始化组件配置
  const resolved = resolveOptions(options);
  //获取loading组件挂载的目标dom节点
  const target = resolved.parent ?? document.body;
  //全屏模式下，返回唯一的全屏实例
  if (resolved.fullscreen && !isNil(fullscreenInstance)) {
    return fullscreenInstance;
  }
  //增加ladding number(在同一个target上多次调用loading返回同一个实例)
  addLoadingNumber(resolved?.parent); //从1变为0才销毁实例
  if (instanceMap.has(target)) {
    return instanceMap.get(target)! as LoadingInstance;
  }
  //TODO:
  //创建loading实例
  const instance = createLoading({
    ...resolved,
    closed: () => {
      resolved.closed?.();
      if (resolved.fullscreen) {
        fullscreenInstance = null;
      }
    },
  });
  addClass(options, resolved?.parent);
  resolved.parent?.appendChild(instance.$el);
  nextTick(() => (instance.visible.value = !!resolved.visible));
  if (resolved.fullscreen) {
    fullscreenInstance = instance;
  }
  instanceMap.set(target, instance);
  return instance;
}
