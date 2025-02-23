import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from "@hangui/utils";
export const HConfigProvider = withInstall(ConfigProvider);
export * from "./types";
export * from "./hooks";
