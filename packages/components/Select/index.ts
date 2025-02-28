import Select from "./Select.vue";
import Option from "./Option.vue";

import { withInstall } from "@hangui/utils";

export const HSelect = withInstall(Select);
export const HOption = withInstall(Option);

export * from "./types";
