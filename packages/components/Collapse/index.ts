import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@hangui/utils";

export const HCollapse = withInstall(Collapse);
export const HCollapseItem = withInstall(CollapseItem);

export * from "./types";
