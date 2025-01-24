import type { Component, Ref } from "vue";

// 这里是Button组件的类型定义文件
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type NativeType = "button" | "reset" | "submit";
export type ButtonSize = "large" | "default" | "small";
//Button组件所需参数类型声明
export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  icon?: string;
  loading?: boolean;
  autofocus?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
  loadingIcon?: string;
}
//button组件触发事件的类型
export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}
//button组件暴露的内容的类型
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}
//buttonGroup组件所需参数的类型
export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

//buttonGroup组件依赖注入所需参数类型
export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}
