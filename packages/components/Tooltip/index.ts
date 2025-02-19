//导入Tooltip组件
import Tooltip from "./Tooltip.vue";
//导入【给组件添加install方法的】函数
import { withInstall } from "@hangui/utils";
//导出添加了install方法的button组件
export const HTooltip = withInstall(Tooltip);
export * from "./types";
