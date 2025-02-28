import { Loading } from "./service";
import { vLoading } from "./directive";
import type { App } from "vue";

export const HLoading = {
  name: "HLoading",
  install(app: App) {
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading,
};

export default HLoading;

export { vLoading, vLoading as ErLoadingDirective, Loading as HLoadingService };

export * from "./types";
