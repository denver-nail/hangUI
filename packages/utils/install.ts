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
