import type { VNode, ComputedRef } from "vue";

// 定义类型别名和接口，用于Select组件的类型声明

// 渲染标签的函数类型
export type RenderLabelFunc = (option: SelectOptionProps) => VNode | string;

// 自定义过滤函数类型
export type CustomFilterFunc = (value: string) => SelectOptionProps[];

// 远程过滤函数类型（异步）
export type CustomFilterRemoteFunc = (
  value: string
) => Promise<SelectOptionProps[] | void>;

// 选项属性接口
export interface SelectOptionProps {
  value: string; // 选项值
  label: string; // 显示文本
  disabled?: boolean; // 是否禁用
}

// Select组件属性接口
export interface SelectProps {
  modelValue: string; // 双向绑定的值
  id?: string; // 组件ID
  options?: SelectOptionProps[]; // 选项列表
  placeholder?: string; // 占位符
  disabled?: boolean; // 是否禁用
  clearable?: boolean; // 是否可清空
  renderLabel?: RenderLabelFunc; // 自定义渲染函数
  filterable?: boolean; // 是否可过滤
  filterMethod?: CustomFilterFunc; // 自定义过滤方法
  remote?: boolean; // 是否远程搜索
  remoteMethod?: CustomFilterRemoteFunc; // 远程搜索方法
}

// Select组件状态接口
export interface SelectStates {
  inputValue: string; // 输入框的值
  selectedOption: SelectOptionProps | void | null; // 当前选中的选项
  mouseHover: boolean; // 鼠标是否悬停
  loading: boolean; // 是否正在加载
  highlightedIndex: number; // 高亮选项的索引
}

// Select组件事件接口
export interface SelectEmits {
  (e: "update:modelValue", value: string): void; // 更新modelValue事件
  (e: "change", value: string): void; // 值改变事件
  (e: "visible-change", vlaue: boolean): void; // 下拉框显示/隐藏事件

  (e: "clear"): void; // 清空事件
  (e: "focus"): void; // 获取焦点事件
  (e: "blur"): void; // 失去焦点事件
}

// Select组件上下文接口
export interface SelectContext {
  selectStates: SelectStates; // 组件状态
  renderLabel?: RenderLabelFunc; // 自定义渲染函数
  highlightedLine?: ComputedRef<SelectOptionProps | void>; // 高亮选项
  handleSelect(item: SelectOptionProps): void; // 处理选择的方法
}

// Select组件实例接口
export interface SelectInstance {
  focus(): void; // 聚焦方法
  blur(): void; // 失焦方法
}
