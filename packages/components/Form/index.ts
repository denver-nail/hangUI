import Form from "./Form.vue";
import FormItem from "./FormItem.vue";

import { withInstall } from "@hangui/utils";

export const HForm = withInstall(Form);
export const HFormItem = withInstall(FormItem);

export * from "./types";
export * from "./hooks";
