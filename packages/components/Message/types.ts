import type { VNode, ComponentInternalInstance, Ref } from "vue";

// 定义一个包含所有消息类型的常量数组，使用 `as const` 保证类型推导为具体的字符串字面量
export const messageTypes = [
  "info",
  "success",
  "warning",
  "danger",
  "error",
] as const;

// 定义 `messageType` 类型，表示上面数组的元素类型之一
export type MessageType = (typeof messageTypes)[number];

// 定义 `MessageHandler` 接口，表示消息处理器，必须有一个 `close` 方法来关闭消息
export interface MessageHandler {
  close(): void;
}
// 定义 `MessageParams` 类型，表示消息参数，可以是字符串、VNode 或 `MessageOptions`
export type MessageParams = string | VNode | MessageOptions;
// 定义 `MessageFn` 类型，表示一个函数，接受 `MessageParams` 类型的参数，并返回 `MessageHandler`
// 该类型还包括一个 `closeAll` 方法，用于关闭所有的消息，可以根据类型选择性关闭
export type MessageFn = {
  (props: MessageParams): MessageHandler; // 主消息显示方法
  closeAll(type?: MessageType): void; // 关闭所有消息（可选传入类型）
};

// 定义 `MessageTypeFn` 类型，表示一个根据消息类型创建消息的函数
export type MessageTypeFn = (props: MessageParams) => MessageHandler;

// 定义 `Message` 接口，继承自 `MessageFn`，并定义了具体的类型方法，如 `success`, `warning` 等
export interface Message extends MessageFn {
  success: MessageTypeFn;
  warning: MessageTypeFn;
  info: MessageTypeFn;
  danger: MessageTypeFn;
  error: MessageTypeFn;
}

// 定义 `MessageProps` 接口，表示一个消息的所有属性
export interface MessageProps {
  id: string; // 每个消息的唯一标识符
  message?: string | VNode | (() => VNode); // 消息内容，支持字符串、虚拟节点或返回虚拟节点的函数
  duration?: number; // 消息显示时长，单位是毫秒
  showClose?: boolean; // 是否显示关闭按钮
  center?: boolean; // 消息是否居中显示
  type?: MessageType; // 消息类型（如 info, success, warning, error）
  offset?: number; // 消息垂直偏移量
  zIndex: number; // 消息的 z-index（显示层级）
  transitionName?: string; // 消息的过渡动画名称
  onDestory(): void; // 消息销毁时的回调函数
}

// 定义 `MessageOptions` 类型，表示消息的部分属性，去除`id`字段，其他字段是可选的
export type MessageOptions = Partial<Omit<MessageProps, "id">>;
//定义Message.vue暴露的类型
export interface MessageCompInstance {
  close(): void;
  bottomOffset: Ref<number>;
}
// 定义 `MessageInstance` 接口，表示一个具体的消息实例
// 包含了 `id`、`vnode`、`props`（消息的所有属性）、`vm`（Vue 实例）、`handler`（消息处理器）
export interface MessageInstance {
  id: string; // 消息实例的唯一标识符
  vnode: VNode; // 消息的虚拟节点
  props: MessageProps; // 消息的所有属性
  vm: ComponentInternalInstance; // 消息的 Vue 实例
  handler: MessageHandler; // 消息的处理器（如关闭消息）
}

// 定义 `CreateMessageProps` 类型，表示创建消息时的属性，去除了 `onDestory`、`id` 和 `zIndex`
export type CreateMessageProps = Omit<
  MessageProps,
  "onDestory" | "id" | "zIndex"
>;
