import {
  createVNode,
  isVNode,
  ref,
  render,
  nextTick,
  type ComponentPublicInstance,
  type VNode,
  type VNodeProps,
  type Ref,
} from "vue";
import type {
  MessageBoxAction,
  MessageBoxOptions,
  MessageBoxData,
  MessageBoxCallback,
  MessageBoxProps,
  IHMessageBox,
} from "./types";
import MessageBoxComponent from "./MessageBox.vue";
import {
  assign,
  each,
  isFunction,
  isObject,
  isString,
  isUndefined,
  set,
} from "lodash-es";
const messageInstanceMap = new Map<
  ComponentPublicInstance<{ doClose: () => void }>,
  {
    options: MessageBoxOptions;
    callback: MessageBoxCallback | void;
    resolve: (res: any) => void;
    reject: (res: any) => void;
  }
>();
function initInstance(props: MessageBoxProps, container: HTMLElement) {
  const visible = ref(false);
  //   主要实现给message传入虚拟节点的逻辑
  const isVNodeMsg = isFunction(props.message) || isVNode(props.message);
  const generateDefalutSlot = (msg: VNode | (() => VNode)) => {
    isFunction(msg) ? msg : () => msg;
  };
  const vnode = createVNode(
    MessageBoxComponent,
    {
      ...props,
      visible,
    } as VNodeProps,
    isVNodeMsg
      ? { default: generateDefalutSlot(props.message as VNode) }
      : void 0
  );
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  return vnode.component;
}
function createMessageBox(options: MessageBoxOptions) {
  const container = document.createElement("div");
  const props: MessageBoxProps = {
    ...options,

    doClose: () => {
      vm.visible.value = false;
    },
    doAction: (action: MessageBoxAction, inputVal: string) => {
      const currentMsgBox = messageInstanceMap.get(vm);
      let resolve:
        | MessageBoxAction
        | { value: string; action: MessageBoxAction };
      nextTick(() => vm.doClose());
      if (options.showInput) {
        resolve = { value: inputVal, action: action };
      } else {
        resolve = action;
      }
      if (options.callback) {
        options.callback(resolve);
        return;
      }
      if (action === "cancel" || action === "close") {
        currentMsgBox?.reject(action);
        return;
      }
      currentMsgBox?.resolve(resolve);
    },
    destroy: () => {
      render(null, container);
      messageInstanceMap.delete(vm);
    },
  };
  const instance = initInstance(props as MessageBoxProps, container);
  const vm = instance?.proxy as ComponentPublicInstance<{
    doClose: () => void;
    visible: Ref<boolean>;
  }>;
  vm.visible.value = true;
  return vm;
}
// 函数重载
function MessageBox(options: MessageBoxOptions): Promise<MessageBoxData>;
function MessageBox(options: MessageBoxOptions | string | VNode): Promise<any> {
  let callback: MessageBoxCallback | void;
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    };
  } else {
    callback = options.callback;
  }
  return new Promise((resolve, reject) => {
    const instance = createMessageBox(options);
    messageInstanceMap.set(instance, { options, callback, resolve, reject });
  });
}
const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"] as const;
const MESSAGE_BOX_DEFAULT_OPTS: Record<
  (typeof MESSAGE_BOX_VARIANTS)[number],
  Partial<MessageBoxOptions>
> = {
  alert: { closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true },
};
function messageBoxFactory(boxType: (typeof MESSAGE_BOX_VARIANTS)[number]) {
  return (
    message: string | VNode,
    title: string | MessageBoxOptions,
    options: MessageBoxOptions
  ) => {
    let titleOrOpts = "";
    if (isObject(title)) {
      options = title as MessageBoxOptions;
      titleOrOpts = "";
    } else if (isUndefined(title)) {
      titleOrOpts = "";
    } else {
      titleOrOpts = title as string;
    }

    return MessageBox(
      assign(
        {
          title: titleOrOpts,
          message,
          type: "",
          boxType,
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
        },
        options
      )
    );
  };
}
each(MESSAGE_BOX_VARIANTS, (type) =>
  set(MessageBox, type, messageBoxFactory(type))
);

set(MessageBox, "close", () => {
  messageInstanceMap.forEach((_, vm) => {
    vm.doClose();
  });
  messageInstanceMap.clear();
});

export default MessageBox as IHMessageBox;
