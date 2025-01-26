import type { InjectionKey } from "vue";
import type { CollapseContext } from "./types";
//Collapse依赖注入所需的key
export const COLLAPSE_CTX_KEY: InjectionKey<CollapseContext> =
  Symbol("collapseContext");
