//导入按钮组件
import Button from "./Button.vue";
//导入【给组件添加install方法的】函数
import { withInstall } from "@hangui/utils";

export const HButton = withInstall(Button);
