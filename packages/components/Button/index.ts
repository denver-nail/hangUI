//导入按钮组件
import Button from "./Button.vue";
//导入【给组件添加install方法的】函数
import { withInstall } from "@hangui/utils";
import ButtonGroup from "./ButtonGroup.vue";
//导出添加了install方法的button组件
export const HButton = withInstall(Button);
//导出添加了install方法的button组件
export const HButtonGroup = withInstall(ButtonGroup);
export * from "./types";
