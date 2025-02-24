import type { VNode, ComponentInternalInstance, Ref } from "vue";

// 定义通知组件的类型常量数组
// 包含四种通知类型：信息、成功、警告、危险
export const notificationTypes = [
  "info", // 信息类型
  "success", // 成功类型
  "warning", // 警告类型
  "danger", // 危险类型
] as const;
// 定义通知组件的类型
export type NotificationType = (typeof notificationTypes)[number];
// 定义通知组件的位置常量数组
export const notificationPosition = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;
// 定义通知组件的位置类型
export type NotificationPosition = (typeof notificationPosition)[number];
// 定义通知组件的属性接口
export interface NotificationProps {
  title: string;
  id: string;
  zIndex: number;
  position: NotificationPosition;
  type?: "success" | "info" | "warning" | "danger" | "error";
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  offset?: number;
  transitionName?: string;
  icon?: string;
  onClick?(): void;
  onClose?(): void;
  onDestory(): void;
}
//定义notification组件暴露的类型
export interface NotificationCompInstance {
  close(): void;
  bottomOffset: Ref<number>;
}
//定义通知组件的实例类型
export interface NotificationInstance {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: NotificationProps;
  handler: NotificationHandler;
}
// 定义创建通知组件的属性接口
export type CreateNotificationProps = Omit<
  NotificationProps,
  "onDestory" | "id" | "zIndex"
>;

// 定义通知组件的处理函数接口
export interface NotificationHandler {
  close(): void;
}
// 定义通知组件的选项接口
export type NotificationOptions = Partial<Omit<NotificationProps, "id">>;
// 定义通知组件的参数类型
export type NotificationParams = string | VNode | NotificationOptions;
// 定义通知组件的函数类型
export type NotificationFn = {
  (props: NotificationParams): NotificationHandler;
  closeAll(type?: NotificationType): void;
};

export type NotificationTypeFn = (
  props: NotificationParams
) => NotificationHandler;

export interface Notification extends NotificationFn {
  success: NotificationTypeFn;
  warning: NotificationTypeFn;
  info: NotificationTypeFn;
  danger: NotificationTypeFn;
}
