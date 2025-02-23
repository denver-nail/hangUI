//导入组件
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
//导入【给组件添加install方法的】函数
import { withInstall } from "@hangui/utils";
//导出添加了install方法的组件
export const HDropdown = withInstall(Dropdown);
export const HDropdownItem = withInstall(DropdownItem);
export * from "./types";
