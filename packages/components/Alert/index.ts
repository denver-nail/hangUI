import Alert from "./Alert.vue";
import { withInstall } from "@hangui/utils";
//导出添加了install方法的alert组件
export const HAlert = withInstall(Alert);
export * from "./types";
