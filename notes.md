# elementplus 项目笔记

## 使用了monorepo方式来管理项目

[前端工程化：如何使用monorepo进行多项目的高效管理前言 假设我们有4个项目 electron:使用Electron - 掘金](https://juejin.cn/post/7043990636751503390?searchId=20250121112141C3A7EC6996ED088ACF48)

## 项目搭建

执行命令：

```
18428@LAPTOP-C34DO4TN MINGW64 /d/Codes/前端学习/18-elemetplus-clone/hangUI (main)
$  echo -e 'packages:\n - "packages/*"' > pnpm-workspace.yaml.yaml
```

```
pnpm init
```

创建文件夹并在每个文件夹下执行

```
pnpm init
```

<img src="assert\image-20250121125846495.png" alt="image-20250121125846495" style="zoom:67%;" />

在packages文件夹下执行命令：

```
pnpm create vite play --telmplate vue-ts
```

创建一个vue项目（play文件夹下）：

![image-20250121130219612](assert\image-20250121130219612.png)

作用：写一些简单的组件看效果使用的。

### 项目文件目录作用

![](assert\Snipaste_2025-01-21_13-52-24.png)

## 修改package.json

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_14-56-07.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_14-56-14.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_14-53-02.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_14-52-56.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_14-52-49.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_14-52-41.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_14-52-18.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_15-20-43.png)

## 安装依赖和配置

**在根目录下**：PS D:\Codes\前端学习\18-elemetplus-clone\hangUI>

```
pnpm add -Dw typescript@^5.2.2 vite@^5.1.4 vitest@^1.4.0 vue-tsc@^1.8.27 postcss-color-mix@^1.1.0 postcss-each@^1.1.0 postcss-each-variables@^0.3.0
pnpm add -Dw postcss-for@^2.1.1 postcss-nested@^6.0.1     
pnpm add -Dw @types/node@^20.11.20    
pnpm add -Dw @types/lodash-es@4.17.12   
pnpm add -Dw @vitejs/plugin-vue@^5.0.4    
pnpm add -Dw @vitejs/plugin-vue-jsx@^3.1.0 @vue/tsconfig@^0.5.1    
 
```

```
pnpm add -w lodash-es@^4.17.21 vue@^3.4.19       
```

> 注意：

`pnpm add -Dw` 是使用 `pnpm`（一个 JavaScript 包管理工具）命令安装依赖项的方式，具体来说：

- `pnpm add`: 用于添加依赖到项目中。
- `-D` 或 `--save-dev`: 表示将依赖添加到 `devDependencies` 中，即只在开发环境中使用的依赖（例如：测试框架、构建工具等）。这样，依赖不会被打包进生产环境的代码中。
- `-w` 或 `--workspace`: 表示在工作区（workspace）中添加依赖。`pnpm` 支持 monorepo（多包仓库）结构，`-w` 使得依赖添加到工作区的根目录，而不是某个单独包的 `node_modules`。

综上：

`pnpm add -Dw` 会把指定的依赖添加到工作区的 `devDependencies` 中，通常用于多个包的项目（monorepo）中，确保这些依赖仅在开发阶段有效。

------

**向根目录下的package.json文件添加内容**

项目显然是一个工作区（monorepo），即一个包含多个包（例如 `hangui`, `@hangui/hooks`, `@hangui/utils`, `@hangui/theme`）的单一代码仓库。

每个子包在工作区中可以被独立开发、发布，并通过 `workspace:*` 依赖来连接。

![](assert\Snipaste_2025-01-21_15-26-35.png)

------

**向components文件夹添加依赖**

PS D:\Codes\前端学习\18-elemetplus-clone\hangUI\packages\components>

```
pnpm add -D @vue/test-utils@^2.4.5 @vitest/coverage-v8@^1.4.0 jsdom@^24.0.0 --filter @hangui/components
pnpm add @popperjs/core@^2.11.8 async-validator@^4.2.5 --filter @hangui/components
```

------

**修改core文件夹的package.json**

core文件夹看作是components文件夹的唯一出口，所以core中只需导入：

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_15-38-18.png)

------

**给docs文件夹添加依赖**

根目录下执行：PS D:\Codes\前端学习\18-elemetplus-clone\hangUI> 

```
pnpm add -D vitepress@1.0.0-rc.44 --filter @hangui/docs
```

**修改play文件夹下的内容**

1.修改package.json:删除一些全局已经安装的依赖

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_15-45-41.png)

2.删除`packages\play\tsconfig.node.json`,`packages\play\tsconfig.json`和`packages\play\tsconfig.app.json`

因为要**配置一个全局的tsconfig**，所以不需要现在这三个了。

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_15-54-02.png)

**添加postcss全局配置**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-21_15-58-10.png)

**最后！！！！！！！！！！在根目录跑一次：**

```
pnpm install
```

## 编写脚本负责vue插件安装

**packages\utils\install.ts**

```ts
// 编写一个脚本来负责vue插件的安装
import type { App, Plugin } from "vue";
import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;
//makeInstaller 函数接受一个组件数组 components（这些组件需要是 Vue 插件类型），并返回一个 installer 函数。installer 函数会将这些组件逐个通过 app.use() 安装到 Vue 应用中。
export function makeInstaller(components: Plugin[]) {
  const installer = (app: App) => each(components, (c) => app.use(c));
  return installer as Plugin;
}
//withInstall 函数接受一个 Vue 组件 component，并给它添加 install 方法。这个方法会将该组件注册到 Vue 应用中，并且允许它作为插件使用。
/* <T> 表示 withInstall 是一个泛型函数，可以接受任何类型的 component。
component: T 表示 component 参数的类型是 T，这个类型将在调用 withInstall 时确定。 */
export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any)?.name || "UnnamedComponent";
    app.component(name, component as SFCWithInstall<T>);
  };
  return component as SFCWithInstall<T>;
};

```

## 封装一个按钮组件流程

第一步：编写组件结构

**packages\components\Button\Button.vue**

```vue
<template>
    <button style="background-color: blue; color:red;">
        this is a button
    </button>
</template>
<script setup lang="ts">
defineOptions({
    name: 'HButton'
})
</script>

```

第二步：导出组件并添加install方法变成vue插件类型

**packages\components\Button\index.ts**

```ts
//导入按钮组件
import Button from "./Button.vue";
//导入【给组件添加install方法的】函数
import { withInstall } from "@hangui/utils";

export const HButton = withInstall(Button);

```

第三步：将按钮组件通过components文件夹统一导出

**packages\components\index.ts**

```ts
//统一导出组件的文件
//导出Button文件夹中index文件中的所有方法
export * from "./Button";

```

第四步：在core文件夹的components.ts文件中添加按钮组件

**packages\core\components.ts**

```ts
//从component文件夹中导入所有组件
import { HButton } from "@hangui/components";
import type { Plugin } from "vue";
//将所有组件作为vue插件暴露给外部
export default [HButton] as Plugin[];

```

第五步：在core文件夹下统一暴露出所有组件

**packages\core\index.ts**

```ts
import { makeInstaller } from "@hangui/utils";
import components from "./components";
//通过返回的 installer，可以将整个插件集合作为一个插件进行统一安装。
const installer = makeInstaller(components);
//core作为所有组件暴露的出口
export * from "@hangui/components";
export default installer;

```

第六步：

在vue项目中使用：

**1.将按钮组件以插件的方式添加到应用上：packages\play\src\main.ts**

```ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
//导入编写的UI库
import HangUI from "hangui";
//使用use将组件以插件的方式添加到应用上
createApp(App).use(HangUI).mount("#app");
```

**2.在页面中使用按钮组件：packages\play\src\App.vue**

```vue
<script setup lang="ts">
</script>

<template>
  <!-- 使用自己的按钮组件 -->
  <HButton />
</template>

<style scoped>
</style>

```

![](assert\Snipaste_2025-01-22_16-07-13.png)

## 样式初始化

**packages\theme\index.css**（入口文件）

```css
/* 导入重置浏览器默认样式 */
@import './reset.css';
```

## vitepress构建项目文档的初始化

**在docs文件夹下执行命令**，进行vitepress初始化：

```
npx vitepress init
```

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_16-41-06.png)

修改命令：

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_16-53-08.png)

**在根目录执行命令**：

```
npm run docs:dev
```

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_16-59-14.png)

**给vitepress添加base配置**

**packages\docs\.vitepress\config.mts**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_17-00-44.png)

## 配置github相关

生成一个新的token：选项全部勾选

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_17-16-37.png)

将token配置到仓库中（需要与代码中的常量同名）

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_17-15-02.png)

**.github\workflows\test-and-deploy.yaml**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_17-17-14.png)
