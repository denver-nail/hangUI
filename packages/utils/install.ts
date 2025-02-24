// 编写一个脚本来负责vue插件的安装
import type { App, Plugin } from "vue";
type SFCWithInstall<T> = T & Plugin;

//withInstall 函数接受一个 Vue 组件 component，并给它添加 install 方法。这个方法会将该组件注册到 Vue 应用中，并且允许它作为插件使用。
/* <T> 表示 withInstall 是一个泛型函数，可以接受任何类型的 component。
component: T 表示 component 参数的类型是 T，这个类型将在调用 withInstall 时确定。 */
export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name;
    app.component(name, component as SFCWithInstall<T>);
  };
  return component as SFCWithInstall<T>;
};
/**
 *  将一个函数包装成一个可安装的 Vue 插件。
 * @param {T} fn - 要包装的函数。
 * @param {string} name - 函数将在 Vue 应用的全局属性中使用的名称。
 * @returns SFCWithInstall<T> - 包装后的函数，带有 install 方法，使其可以作为 Vue 插件使用。
 */
export const withinInstallFunction = <T>(fn: T, name: string) => {
  // 为函数添加 install 方法，使其成为一个 Vue 插件
  (fn as SFCWithInstall<T>).install = (app: App) => {
    // 将函数挂载到 Vue 应用的全局属性上，以便在组件中可以通过 this 访问
    app.config.globalProperties[name] = fn;
  };
  // 返回包装后的函数
  return fn as SFCWithInstall<T>;
};
