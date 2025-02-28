import type { ComputedRef } from "vue";

// 定义Switch组件可以接受的值类型，包括布尔值、字符串和数字
export type SwitchValueType = boolean | string | number;

// 定义Switch组件的属性接口
export interface SwitchProps {
  modelValue: SwitchValueType; // 当前值，用于v-model绑定
  disabled?: boolean; // 是否禁用
  activeText?: string; // 激活时显示的文字
  inactiveText?: string; // 未激活时显示的文字
  activeValue?: SwitchValueType; // 激活时的值
  inactiveValue?: SwitchValueType; // 未激活时的值
  name?: string; // 输入框的name属性
  id?: string; // 输入框的id属性
  size?: "small" | "large"; // 开关尺寸
}

// 定义Switch组件的事件接口
export interface SwitchEmits {
  (e: "update:modelValue", value: SwitchValueType): void; // 更新modelValue事件
  (e: "change", value: SwitchValueType): void; // 值改变事件
}

// 定义Switch组件的实例接口
export interface SwitchInstance {
  focus(): void; // 聚焦方法
  checked: ComputedRef<boolean>; // 计算属性，表示当前是否选中
}
