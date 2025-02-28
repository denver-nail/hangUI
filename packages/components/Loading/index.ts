import { Loading } from "./service";

import type { App } from "vue";

export const HLoading = {
  name: "HLoading",
  install(app: App) {
    //TODO:
    app.config.globalProperties.$loading = Loading;
  },
  //TODO:
  service: Loading,
};

export default HLoading;

export { Loading as HLoadingService };

export * from "./types";
