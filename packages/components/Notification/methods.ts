import { h, isVNode, render, shallowReactive } from "vue";
import type {
  CreateNotificationProps,
  NotificationFn,
  NotificationHandler,
  NotificationInstance,
  NotificationParams,
  NotificationProps,
  NotificationType,
  Notification,
} from "./types";
import { notificationTypes, notificationPosition } from "./types";
import { useId, useZIndex } from "@hangui/hooks";
import { each, findIndex, get, isString, set } from "lodash-es";
import NotificationComponent from "./Notification.vue";
//使用 Vue 的 shallowReactive 创建响应式对象 instances，用于存储各个方向的Notifciation组件实例
// const instances: NotificationInstance[] = shallowReactive([]);
const instanceMap: Map<NotificationProps["position"], NotificationInstance[]> =
  new Map();
each(notificationPosition, (position) => {
  instanceMap.set(position, shallowReactive([]));
});
const { nextZIndex } = useZIndex();
//Notification组件的默认配置
export const notificationDefault = {
  type: "info",
  duration: 3000,
  closable: false,
  offset: 20,
  transitionName: "fade",
  showClose: true,
  position: "top-right",
} as const;

//规范化消息选项参数，将其转换为标准的创建消息属性对象。
const normalizedOptions = (
  opts: NotificationParams
): CreateNotificationProps => {
  // 如果 opts 为空、是 VNode 或字符串，则将其作为 message 属性的值，否则直接使用 opts
  const result =
    !opts || isVNode(opts) || isString(opts) ? { message: opts } : opts;
  // 合并默认配置和处理后的 result 对象，并将结果转换为 CreateMessageProps 类型
  return { ...notificationDefault, ...result } as CreateNotificationProps;
};
//根据position获取对应的Notification实例
const getInstacesByPosition = (
  position: NotificationProps["position"]
): NotificationInstance[] => {
  return instanceMap.get(position)!;
};
const createNotification = (
  props: CreateNotificationProps
): NotificationInstance => {
  const id = useId().value;
  const container = document.createElement("div");
  const instances = getInstacesByPosition(props.position || "top-right");
  const desorty = () => {
    const idx = findIndex(instances, { id });
    if (idx === -1) return;
    instances.splice(idx, 1);
    //将 null 传递给 render 函数时，Vue 会把之前渲染的内容从 container 中移除，实际上就是卸载组件并清理相关的事件监听器和状态。
    render(null, container);
  };
  const _props: NotificationProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: desorty,
  };
  const vnode = h(NotificationComponent, _props);
  //将生成的虚拟节点 vnode 渲染到 container 元素中
  render(vnode, container);
  //将 container 元素的第一个子元素（即渲染的消息组件）添加到文档的 body 中
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!;
  const handler: NotificationHandler = {
    close: () => vm.exposed!.close(),
  };
  const instance: NotificationInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler,
  };
  instances.push(instance);
  return instance as NotificationInstance;
};
export const notification: NotificationFn & Partial<NotificationProps> =
  function (options = {}) {
    const normalized = normalizedOptions(options);
    const instance = createNotification(normalized);
    return instance.handler;
  };
export function closeAll(type?: NotificationType) {
  instanceMap.forEach((instances) => {
    each(instances, (instance) => {
      if (type) {
        instance.props.type === type && instance.handler.close();
        return;
      }
      instance.handler.close();
    });
  });
}
each(notificationTypes, (type) => {
  set(notification, type, (options: NotificationParams) => {
    const normalized = normalizedOptions(options);
    return notification({ ...normalized, type });
  });
});
//获取上一个Notification组件的bottomOffset
export function getLastBottomOffset(this: NotificationProps) {
  const instances = getInstacesByPosition(this.position || "top-right");
  const idx = findIndex(instances, { id: this.id });
  if (idx <= 0) return 0;
  return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}
notification.closeAll = closeAll;
export default notification as Notification;
