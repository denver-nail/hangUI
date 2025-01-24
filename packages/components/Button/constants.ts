import type { InjectionKey } from "vue";
import type { ButtonGroupContext } from "./types";
//ButtonGroup组件依赖注入使用的key
export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContext> = Symbol(
  "BUTTON_GROUP_CTX_KEY"
);
