<script setup lang="ts">
import { ref, type Ref, computed, watchEffect, watch, onUnmounted } from "vue";
import type { TooltipEmits, TooltipInstance, TooltipProps } from "./types";
import { bind, debounce, type DebouncedFunc } from "lodash-es";
import { createPopper, type Instance } from "@popperjs/core";
import { useClickOutside } from "@hangui/hooks";
import useEvenstToTiggerNode from "./useEventsTriggerNode";
import type { ButtonInstance } from "../Button";
defineOptions({
  name: "HTooltip",
});

interface _TooltipProps extends TooltipProps {
  virtualRef?: HTMLElement | ButtonInstance | void;
  virtualTriggering?: boolean;
}
const props = withDefaults(defineProps<_TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  showTimeout: 0,
  hideTimeout: 200,
});
const emits = defineEmits<TooltipEmits>();
//标识组件可见性
const visible = ref(false);
//定义一个响应式对象 events，它的类型是一个键为字符串、值为 EventListener 函数的对象。
const events: Ref<Record<string, EventListener>> = ref({});
const outerEvents: Ref<Record<string, EventListener>> = ref({});
const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

const containerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const _triggerNode = ref<HTMLElement>();
//这个属性用于指定哪个元素将触发提示框的显示和隐藏。
const triggerNode = computed(() => {
  if (props.virtualTriggering)
    return (
      // @tips any 为了 fix 一个初始设计上的小失误 （后续重构 "虚拟目标节点" 时解决）
      ((props.virtualRef as ButtonInstance)?.ref as any) ??
      (props.virtualRef as HTMLElement) ??
      _triggerNode.value
    );
  return _triggerNode.value as HTMLElement;
});
// popperOptions 用于配置 Popper.js 的定位选项，控制提示框的定位行为。
const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));
//计算在hover方式触发下应该延迟的时长
const openDelay = computed(() =>
  props.trigger === "hover" ? props.showTimeout : 0
);
const closeDelay = computed(() =>
  props.trigger === "hover" ? props.hideTimeout : 0
);
//triggerStrategyMap 是一个 Map，它根据不同的触发方式（如 hover、click、contextmenu）来设置相应的事件处理函数。
const triggerStrategyMap: Map<string, () => void> = new Map();
triggerStrategyMap.set("hover", () => {
  events.value["mouseenter"] = openFinal;
  outerEvents.value["mouseleave"] = closeFinal;
  dropdownEvents.value["mouseenter"] = openFinal;
});
triggerStrategyMap.set("click", () => {
  events.value["click"] = togglePopper;
});
triggerStrategyMap.set("contextmenu", () => {
  events.value["contextmenu"] = (e) => {
    e.preventDefault();
    openFinal();
  };
});
//声明两个防抖函数：后续在watchEffect中实现赋值
let openDebounce: DebouncedFunc<() => void> | void;
let closeDebounce: DebouncedFunc<() => void> | void;
//openFinal 和 closeFinal 会先取消当前正在执行的防抖操作，然后执行相应的防抖操作来显示或隐藏提示框。
function openFinal() {
  // 如果 closeDebounce 存在，则调用它的 cancel 方法，取消关闭的防抖操作
  closeDebounce?.cancel();
  // 如果 openDebounce 存在，则调用它，执行打开的防抖操作
  openDebounce?.();
}
function closeFinal() {
  // 如果 openDebounce 存在，则调用它的 cancel 方法，取消打开的防抖操作
  openDebounce?.cancel();
  // 如果 closeDebounce 存在，则调用它，执行关闭的防抖操作
  closeDebounce?.();
}
//切换可见性
function togglePopper() {
  visible.value ? closeFinal() : openFinal();
}
//设置可见性
function setVisible(val: boolean) {
  if (props.disabled) return;
  //更新组件可见性
  visible.value = val;
  //触发组件可见性变化事件
  emits("visible-change", val);
}
//根据 props.trigger 的不同值，绑定不同的事件到外层元素或下拉菜单元素。
function attachEvents() {
  if (props.disabled || props.manual) return;

  triggerStrategyMap.get(props.trigger)?.();
}
//popper实例的声明
let popperInstance: null | Instance;
//删除popper实例的方法
function destroyPopperInstance() {
  popperInstance?.destroy();
  popperInstance = null;
}

//重置事件绑定
function resetEvents() {
  //先重置所有事件绑定
  events.value = {};
  outerEvents.value = {};
  dropdownEvents.value = {};
  //重新执行绑定
  attachEvents();
}
const show: TooltipInstance["show"] = openFinal;
const hide: TooltipInstance["hide"] = function () {
  openDebounce?.cancel();
  setVisible(false);
};
//监听visible变化
watch(
  visible,
  (val) => {
    //当 visible 变为 true 时，组件会创建 Popper.js 实例。
    //createPopper 用于生成提示框的位置和定位，这会基于触发节点和提示框的 DOM 元素来计算。
    if (!val) return;

    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );
    }
  },
  { flush: "post" }
);
//监听props.manual的变化
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      resetEvents();
      return;
    }
    attachEvents();
  }
);

//监听props.trigger的变化
watch(
  () => props.trigger,
  () => {
    openDebounce?.cancel();
    visible.value = false;
    emits("visible-change", false);
    resetEvents();
  }
);
watchEffect(() => {
  //不是手动模式则绑定事件
  if (!props.manual) {
    attachEvents();
  }
  //创建一个防抖函数，并将 setVisible 函数的 this 绑定到 null，同时预先填充参数 true，openDelay.value是防抖的延迟时间（以毫秒为单位）。
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});
//useClickOutside 是一个自定义 hook，用于检测点击事件是否发生在组件外部
useClickOutside(containerNode, () => {
  emits("click-outside");
  if (props.trigger === "hover" || props.manual) return;
  visible.value && closeFinal();
});
// 对虚拟节点的事件的处理
useEvenstToTiggerNode(props, triggerNode, events, () => {
  openDebounce?.cancel();
  setVisible(false);
});
onUnmounted(() => {
  destroyPopperInstance();
});
// 暴露给外部的方法
defineExpose<TooltipInstance>({
  show,
  hide,
});
</script>

<template>
  <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="er-tooltip__trigger"
      ref="_triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="er-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
@import "./style.css";
</style>
