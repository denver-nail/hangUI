//从component文件夹中导入所有组件
import { HButton, HButtonGroup, HIcon } from "@hangui/components";
import type { Plugin } from "vue";
//将所有组件作为vue插件暴露给外部
export default [HButton, HIcon, HButtonGroup] as Plugin[];
