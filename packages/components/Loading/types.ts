// 导入 MaybeRef 类型，用于支持 ref 或普通值
import type { MaybeRef } from "vue";
// 定义 LoadingOptionsResolved 接口，表示加载组件的完整配置选项
export interface LoadingOptionsResolved {
  parent?: HTMLElement; // 父元素，可选
  target?: HTMLElement; // 目标元素，可选
  visible?: MaybeRef<boolean>; // 是否显示，支持 ref 或 boolean
  background?: MaybeRef<string>; // 背景色，支持 ref 或 string
  spinner?: MaybeRef<boolean | string>; // 加载图标，支持 ref、boolean 或 string
  text?: MaybeRef<string>; // 加载文本，支持 ref 或 string
  fullscreen?: MaybeRef<boolean>; // 是否全屏，支持 ref 或 boolean
  lock?: MaybeRef<boolean>; // 是否锁定滚动，支持 ref 或 boolean
  beforeClose?(): boolean; // 关闭前的回调函数，可选
  closed?(): void; // 关闭后的回调函数，可选
}

// 定义 LoadingOptions 类型，表示加载组件的可选配置选项
export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, "parent" | "target"> & {
    // 排除 parent 和 target 属性
    target: HTMLElement | string; // 目标元素，可以是 HTMLElement 或字符串选择器
    body: boolean; // 是否应用于 body 元素
    zIndex?: number; // z-index 值，可选
    onAfterLeave(): void; // 离开后的回调函数
  }
>;
