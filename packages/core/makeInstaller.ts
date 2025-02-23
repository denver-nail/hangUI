import type { App, Plugin } from "vue";
import { each } from "lodash-es";
import {
  provideGlobalConfig,
  type ConfigProviderProps,
} from "@hangui/components";
//makeInstaller 函数接受一个组件数组 components（这些组件需要是 Vue 插件类型），并返回一个 installer 函数。installer 函数会将这些组件逐个通过 app.use() 安装到 Vue 应用中。
export function makeInstaller(components: Plugin[]) {
  const installer = (app: App, opts?: ConfigProviderProps) => {
    each(components, (c) => app.use(c));
    if (opts) provideGlobalConfig(opts, app, true);
  };
  return installer as Plugin;
}
