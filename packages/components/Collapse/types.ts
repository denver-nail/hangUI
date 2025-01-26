import type { Ref } from "vue";

export type CollapseItemName = string | number;
//折叠面板的参数
export interface CollapseProps {
  modelValue: CollapseItemName[]; //用来实现v-model
  accordion?: boolean;
}
//折叠面板item的参数
export interface CollapseItemProps {
  name: CollapseItemName;
  title?: string;
  disabled?: boolean;
}
//折叠面板触发事件的类型
export interface CollapseEmits {
  (e: "update:modelValue", value: CollapseItemName[]): void;
  (e: "change", value: CollapseItemName[]): void;
}
//依赖注入所需要的上下文类型
export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>;
  handleItemClick(name: CollapseItemName): void;
}
