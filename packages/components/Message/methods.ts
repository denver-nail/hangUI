import { h, isVNode, render, shallowReactive } from "vue";
import type {
  CreateMessageProps,
  MessageHandler,
  MessageInstance,
  MessageFn,
  Message,
  MessageParams,
  MessageType,
  MessageProps,
} from "./types";
import { messageTypes } from "./types";
import { each, findIndex, get, isString, set } from "lodash-es";
import MessageComponent from "./Message.vue";
import useId from "../../hooks/useId";
import { useZIndex } from "@hangui/hooks";
//message的默认配置
const messageDefaults = {
  type: "info",
  message: "",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
} as const;
//使用 Vue 的 shallowReactive 创建响应式对象 instances，用于存储消息实例
const instances: MessageInstance[] = shallowReactive([]);
const { nextZIndex } = useZIndex();
/**
 * 规范化消息选项参数，将其转换为标准的创建消息属性对象。
 *
 * @param {MessageParams} opts - 消息选项参数，可以是字符串、VNode 或包含消息配置的对象。
 * @returns {CreateMessageProps} - 返回一个包含标准消息配置的对象。
 */
const normalizedOptions = (opts: MessageParams): CreateMessageProps => {
  // 如果 opts 为空、是 VNode 或字符串，则将其作为 message 属性的值，否则直接使用 opts
  const result =
    !opts || isVNode(opts) || isString(opts) ? { message: opts } : opts;
  // 合并默认配置和处理后的 result 对象，并将结果转换为 CreateMessageProps 类型
  return { ...messageDefaults, ...result } as CreateMessageProps;
};
const createMessage = (props: CreateMessageProps): MessageInstance => {
  const id = useId().value;
  const container = document.createElement("div");
  const desorty = () => {
    const idx = findIndex(instances, { id });
    if (idx === -1) return;
    instances.splice(idx, 1);
    //将 null 传递给 render 函数时，Vue 会把之前渲染的内容从 container 中移除，实际上就是卸载组件并清理相关的事件监听器和状态。
    render(null, container);
  };
  const _props: MessageProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: desorty,
  };
  const vnode = h(MessageComponent, _props);
  //将生成的虚拟节点 vnode 渲染到 container 元素中
  render(vnode, container);
  //将 container 元素的第一个子元素（即渲染的消息组件）添加到文档的 body 中
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!;
  const handler: MessageHandler = {
    close: () => vm.exposed!.close(),
  };
  const instance: MessageInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler,
  };
  instances.push(instance);
  return instance as MessageInstance;
};
//获取上一个message的bottomOffset
export function getLastBottomOffset(this: MessageProps) {
  const idx = findIndex(instances, { id: this.id });
  if (idx <= 0) return 0;
  return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}
//创建message
export const message: MessageFn & Partial<Message> = (options = {}) => {
  const normailized = normalizedOptions(options);
  const instance = createMessage(normailized);
  return instance.handler;
};
//关闭所有message（关闭所有同类型message）
export function closeAll(type?: MessageType) {
  each(instances, (instance) => {
    if (type) {
      instance.props.type === type && instance.handler.close();
      return;
    }
    instance.handler.close();
  });
}
each(messageTypes, (type) => {
  // 为 message 对象动态添加名为 type 的方法
  set(message, type, (options: MessageParams) => {
    // 将 options 参数规范化为标准的 CreateMessageProps 对象
    const normailized = normalizedOptions(options);
    // 调用 message 函数创建消息实例，并指定消息类型
    return message({ ...normailized, type });
  });
});
message.closeAll = closeAll;
export default message as Message;
