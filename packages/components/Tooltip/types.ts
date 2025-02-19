// 导入 Popper.js 的类型定义，用于工具提示的定位和配置选项
import type { Placement, Options } from "@popperjs/core";

// 定义 Tooltip 组件的属性接口
export interface TooltipProps {
  // 工具提示的内容，可以是字符串
  content?: string;

  // 触发工具提示显示的方式，可以是 "hover"（悬停）、"click"（点击）或 "contextmenu"（右键菜单）
  trigger?: "hover" | "click" | "contextmenu";

  // 工具提示的显示位置，使用 Popper.js 的 Placement 类型
  placement?: Placement;

  // 是否手动控制工具提示的显示和隐藏
  manual?: boolean;

  // 是否禁用工具提示
  disabled?: boolean;

  // Popper.js 的配置选项，使用 Partial<Options> 表示这些选项是可选的
  popperOptions?: Partial<Options>;

  // 工具提示显示和隐藏时的过渡效果
  transition?: string;

  // 显示工具提示的延迟时间（毫秒）
  showTimeout?: number;

  // 隐藏工具提示的延迟时间（毫秒）
  hideTimeout?: number;
}

// 定义 Tooltip 组件的事件接口
export interface TooltipEmits {
  // 当工具提示的可见状态发生变化时触发，参数为当前的可见状态（true/false）
  (e: "visible-change", value: boolean): void;

  // 当点击工具提示外部时触发
  (e: "click-outside"): void;
}

// 定义 Tooltip 组件的实例接口
export interface TooltipInstance {
  // 显示工具提示的方法
  show(): void;

  // 隐藏工具提示的方法
  hide(): void;
}
