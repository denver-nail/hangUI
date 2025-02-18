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

**GitHub的actions的 初始状态**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_17-22-36.png)

**actions配置成功**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-22_19-40-41.png)

## 使用nvm管理node版本

我的电脑上只有一个版本的node ：v20.11.0
[nvm-下载、安装、使用](https://blog.csdn.net/m0_54345753/article/details/131653960)

没有使用nvm管理node 版本。

## 使用大模型生成需求分析和单元测试用例

例如：Button组件的单元测试用例（简单版本）：

**packages\components\Button\Button.test.tsx**

```tsx
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";

describe("Button.vue", () => {
  // Props: type
  /* 测试 Button 组件的 type 属性是否正确地应用了对应的 CSS 类。
    定义了五种按钮类型（primary、success、warning、danger、info）。
    对每种类型，使用 mount 方法渲染组件，并传入对应的 type 属性。
    检查组件的 classes() 是否包含类似 er-button--primary 的类名。 */
  it("should has the correct type class when type prop is set", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any },
      });
      expect(wrapper.classes()).toContain(`er-button--${type}`);
    });
  });

  // Props: size
  /* 测试 Button 组件的 size 属性是否正确地应用了对应的 CSS 类。
    定义了三种按钮尺寸（large、default、small）。
    对每种尺寸，渲染组件并传入对应的 size 属性。
    检查组件的 classes() 是否包含类似 er-button--large 的类名。 */
  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      });
      expect(wrapper.classes()).toContain(`er-button--${size}`);
    });
  });

  // Props: plain, round, circle
  /* 测试 Button 组件的布尔属性（plain、round、circle、disabled、loading）是否正确地应用了对应的 CSS 类。
    使用 it.each 方法对每种布尔属性进行测试。
    渲染组件并传入对应的布尔属性（如 { plain: true }）。
    检查组件的 classes() 是否包含对应的类名（如 is-plain）。
    特别地，ErIcon 被设置为全局的桩组件（stubs），用于模拟可能存在的子组件。 */
  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])(
    "should has the correct class when prop %s is set to true",
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ["ErIcon"],
        },
      });
      expect(wrapper.classes()).toContain(className);
    }
  );
  /* 测试 Button 组件的 native-type 属性是否正确地设置了原生 HTML 元素的 type 属性。
    渲染组件并传入 nativeType="submit"。
    检查渲染的元素是否是 <button> 标签，并且其 type 属性是否为 submit。 */
  it("should has the correct native type attribute when native-type prop is set", () => {
    const wrapper = mount(Button, {
      props: { nativeType: "submit" },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as any).type).toBe("submit");
  });

  // Props: tag
  /* 测试 Button 组件的 tag 属性是否正确地渲染了自定义的 HTML 标签。
    渲染组件并传入 tag="a"。
    检查渲染的元素是否是 <a> 标签。 */
  it("should renders the custom tag when tag prop is set", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  // Events: click
  /* 测试 Button 组件是否正确地触发了点击事件。
    渲染组件后，使用 wrapper.trigger("click") 模拟点击操作。
    检查组件是否发出了 click 事件，并且事件被触发了 1 次。 */
  it("should emits a click event when the button is clicked", async () => {
    const wrapper = mount(Button, {});
    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toHaveLength(1);
  });
});

```

## 编写Button组件

**编写进程（2）【编号对应git提交的描述内容与button组件相关的编号】**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-23_22-08-29.png)

## 配置storybook

[Storybook for Vue & Vite | Storybook docs](https://storybook.js.org/docs/get-started/frameworks/vue3-vite?renderer=vue)

**在play文件夹下**执行命令：

```
pnpm dlx storybook@latest init
```

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-24_10-56-32.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-24_12-04-19.png)

## 引入图标库

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-24_20-58-52.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-24_21-00-15.png)

## 编写Icon组件

使用`$attrs`和` inheritAttrs: false`

在 Vue 3 中，`v-bind="$attrs"` 的作用是将组件上接收到的所有未定义的属性绑定到一个特定的元素上。例如，在你的代码中：

```vue
<i
    class="er-icon"
    :class="[`er-icon-${type}`]"
    :style="customStyles"
    v-bind="$attrs"
>
    <font-awesome-icon v-bind="filterProps" />
</i>
```

**功能解析**

1. **$attrs 的来源：**

   - `props` 是通过 `defineProps` 明确声明的属性。

   - 除了声明的 `props`，组件接收到的其他未声明的属性都会被存储在 `$attrs` 中。

   - ```
     $attrs
     ```

      通常包括：

     - 原生 HTML 属性（如 `id`、`aria-*` 等）。
     - 自定义的非声明属性。

2. **作用：**

   - `v-bind="$attrs"` 会将 `$attrs` 中的所有属性绑定到 `<i>` 标签上。
   - 这样可以灵活地将未处理的属性传递到组件的根元素，或者让用户动态添加属性。

3. **配合 `inheritAttrs: false` 的意义：**

   - 默认情况下，Vue 会将所有 `$attrs` 自动绑定到组件的根元素上。
   - 当你使用 `inheritAttrs: false` 时，Vue 会阻止自动绑定，你可以手动选择要绑定的元素（如 `<i>` 标签）。
   - 这提供了更精确的控制，避免多余属性污染组件的根节点。

------

**示例**

假设你使用该组件如下：

```vue
<HIcon type="home" color="blue" id="icon-id" aria-label="Home Icon" />
```

**处理结果**：

- `type` 和 `color` 是定义在 `props` 中的，会直接被组件处理。
- `id` 和 `aria-label` 是未定义的属性，它们会被存储在 `$attrs` 中。
- 通过 `v-bind="$attrs"`，这些属性会被绑定到 `<i>` 标签上。

最终渲染的结果为：

```html
<i
    class="er-icon er-icon-home"
    style="color: blue;"
    id="icon-id"
    aria-label="Home Icon"
>
    <!-- FontAwesome 图标 -->
</i>
```

------

**$attrs 的典型用法**

1. **传递事件监听器：** `$attrs` 也可以包含事件监听器，例如 `@mouseover` 或 `@focus` 等。

   ```vue
   <HIcon type="home" @click="handleClick" />
   ```

   如果你没有在组件中显式声明 `onClick`，`@click` 会自动存储在 `$attrs` 中，并通过 `v-bind="$attrs"` 绑定到 `<i>` 标签。

2. **过滤多余属性：** 如果你不想让所有 `$attrs` 都传递到子元素上，可以手动筛选需要的属性：

   ```typescript
   const filteredAttrs = computed(() => {
       const { id, 'aria-label': ariaLabel, ...rest } = $attrs;
       return rest;
   });
   ```

   然后：

   ```vue
   <i v-bind="filteredAttrs" />
   ```

------

**注意事项**

1. **避免冲突：** 确保 `$attrs` 中的属性不会与组件自身的 `props` 或 `v-bind` 属性冲突，否则可能会被覆盖。
2. **可读性：** 虽然 `v-bind="$attrs"` 提供了很大灵活性，但在复杂组件中，手动筛选并明确绑定重要属性更能提高代码可读性。

## 结合Button组件编写ButtonGroup组件

ButtonGroup组件由多个Button组件构成，可选地传递参数`type`,`size` ,`disabled`给Button组件。

这就使用了**依赖注入**的方式传递参数。

## 项目打包

项目使用的vite打包工具，所以需要在**core**文件夹下对vite进行配置。打包格式有两种：

1. UMD
2. ES Module

**ES形式的配置**

```ts
//这里是使用vite对项目进行ES形式的打包
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});

```

**UMD形式的配置**

```ts
//这里是使用vite对项目进行UMD形式的打包
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});

```

**修改packages\core\package.json**

添加两条build命令

```json
{
  "name": "hangui",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "build-umd": "vite build --config vite.umd.config.ts",
    "build-es": "vite build --config vite.es.config.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@hangui/components": "workspace:*"
  }
}
```

在core目录下执行命令：

```
npm run build-umd
npm run build-es
```

生成打包后的文件：

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_14-50-50.png)

安装vite插件使得其他用户使用打包后的包拥有**类型提示**：

1.在core终端执行：

```
 pnpm add vite-plugin-dts@^3.9.1 -D
```

2.修改**packages\core\vite.es.config.ts**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_15-15-36.png)

3.再次执行命令：

```
npm run build-es
```

4.打包后的结构

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_15-17-54.png)

又希望在dist文件夹下有一个type文件夹单独存放类型以及一个es和一个umd文件夹，而且现在生成的类型还是不符合预期。所以进行限制：

1.在根目录新增`tsconfig.build.json`文件

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "jsxImportSource": "vue",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "packages/core/index.ts",
    "packages/hooks/**/*.ts",
    "packages/utils/**/*.ts",
    "packages/components/index.ts",
    "packages/components/**/*.vue",
    "packages/components/**/*.ts"
  ]
}

```

2.修改**packages\core\vite.es.config.ts**

```ts
//这里是使用vite对项目进行ES形式的打包
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
      //修改这里
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});

```

3.再次执行命令：

```
npm run build-es
```

4.打包结构

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_15-28-56.png)

以分包的形式打包

1.修改**packages\core\vite.es.config.ts**

```ts
//这里是使用vite对项目进行ES形式的打包
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { includes } from "lodash-es";
const COMP_NAMES = [
  "Button",
  "Icon",
  "Alert",
  "Collapse",
  "Dropdown",
  "Form",
  "Input",
  "Loading",
  "Message",
  "MessageBox",
  "Overlay",
  "Popconfirm",
  "Select",
  "Switch",
  "Tooltip",
  "Upload",
] as const;
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";

          if (includes(id, "/packages/hooks")) return "hooks";

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils";
          for (const item of COMP_NAMES) {
            if (includes(id, `/packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});

```

2.再次执行命令：

```
npm run build-es
```

3.打包结构

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_16-02-50.png)

随后需要将入口的样式文件`packages\core\dist\es\index.css`放到`packages\core\dist\index.css`

1.在**根目录**装工具包

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI> pnpm add move-file-cli@^3.0.0 -Dw
```

2.在**packages\core\package.json**添加命令

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_16-09-55.png)

还需将npm script串联起来

1.在**根目录**装工具包

```
pnpm add npm-run-all@^4.1.5 -Dw
```

2.在**packages\core\package.json**添加命令

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_16-30-51.png)

3.在package.json添加命令

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_16-27-38.png)

4.在根目录执行build

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI> npm run build
```

5.打包后结构

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_16-32-05.png)

最后调整依赖

1.**packages\components\package.json**

```json
{
  "name": "@hangui/components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "vitest --coverage"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@vitest/coverage-v8": "^1.4.0",
    "@vue/test-utils": "^2.4.5",
    "jsdom": "^24.0.0"
  }
}
```

**2.packages\core\package.json**

```json
{
  "name": "hangui",
  "version": "1.0.0",
  "description": "Components library by Vue3 + Ts",
  "type": "module",
  "main": "./dist/umd/index.umd.cjs",
  "module": "./dist/es/index.js",
  "types": "./dist/types/core/index.d.ts",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "import": "./dist/es/index.js",
      "require": "./dist/umd/index.umd.cjs",
      "types": "./dist/types/core/index.d.ts"
    },
    "./dist/": {
      "import": "./dist/",
      "require": "./dist/"
    }
  },
  "sideEffects": [
    "./dist/index.css",
    "./dist/theme/*.css"
  ],
  "scripts": {
    "build": "run-p build-only move-style",
    "build-only": "run-p build-es build-umd",
    "build-umd": "vite build --config vite.umd.config.ts",
    "build-es": "vite build --config vite.es.config.ts",
    "move-style": "move-file dist/es/index.css dist/index.css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.5.2",
    "@fortawesome/free-solid-svg-icons": "^6.5.2",
    "@fortawesome/vue-fontawesome": "^3.0.8",
    "@popperjs/core": "^2.11.8",
    "async-validator": "^4.2.5"
  },
  "devDependencies": {
    "vite-plugin-dts": "^3.9.1",
    "@hangui/components": "workspace:*"
  },
  "peerDependencies": {
    "vue": "^3.4.19"
  }
}
```

**3.package.json**

```json
{
  "name": "@hangui/workspace",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "pnpm --filter @hangui/play dev",
    "story": "pnpm --filter @hangui/play storybook",
    "docs:dev": "pnpm --filter @hangui/docs dev",
    "docs:build": "pnpm --filter @hangui/docs build",
    "test": "pnpm --filter @hangui/components test",
    "build": "pnpm --filter hangui build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/lodash-es": "4.17.12",
    "@types/node": "^20.11.20",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    "@vue/tsconfig": "^0.5.1",
    "@popperjs/core": "^2.11.8",
    "async-validator": "^4.2.5",
    "move-file-cli": "^3.0.0",
    "npm-run-all": "^4.1.5",
    "postcss-color-mix": "^1.1.0",
    "postcss-each": "^1.1.0",
    "postcss-each-variables": "^0.3.0",
    "postcss-for": "^2.1.1",
    "postcss-nested": "^6.0.1",
    "typescript": "^5.6.3",
    "vite": "^5.1.4",
    "vitest": "^1.4.0",
    "vue-tsc": "^1.8.27"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.5.2",
    "@fortawesome/free-solid-svg-icons": "^6.5.2",
    "@fortawesome/vue-fontawesome": "^3.0.8",
    "@hangui/hooks": "workspace:*",
    "@hangui/theme": "workspace:*",
    "@hangui/utils": "workspace:*",
    "hangui": "workspace:*",
    "lodash-es": "^4.17.21",
    "vue": "^3.4.19"
  }
}
```

最后的最后：

优化packages\core\vite.es.config.ts

```ts
//这里是使用vite对项目进行ES形式的打包
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { readdirSync, readdir } from "fs";
import { resolve } from "path";
import { defer, delay, filter, map, includes } from "lodash-es";
//替换了原本的数组常量
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";

          if (includes(id, "/packages/hooks")) return "hooks";

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils";
          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});

```

修改入口文件中的路径问题：

**packages\core\index.ts**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_17-38-15.png)

## npm发布

1.登录npm

执行命令:

```
nrm use npm
```

执行命令：

```
npm login
```

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_20-31-06.png)

2.修改版本号**packages\core\package.json**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_20-40-35.png)

>  3.包名重复修改:注意！！！！！

由于包名hangui重复,所以需要更改包名.所以对应的地方都要相应修改(**带有命名空间**):

`hangui `修改成`@purple-liu/hangui` 

4.在打包的文件目录执行命令

```
npm publish --access=public
```

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_21-19-58.png)

### 更优雅的打包

避免每次上传新的版本都需要手动修改版本号.

1.在根目录执行命令安装

```
pnpm add rimraf -Dw
```

`rimraf`用于每次打包前清理dist文件,避免上一次打包的缓存影响最新一次的打包.

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_21-33-45.png)

2.在根目录执行命令安装

```
pnpm add release-it -Dw
```

`release-it`用于发布时自动更新版本号

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_21-36-32.png)

使用:

1.将项目中的修改全部提交到github,使得git工作树处于一个干净的状态.

2.设定git默认分支:

```
git push --set-upstream orgin main
```

3.执行命令

```
npm run release
```

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_21-48-11.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-25_21-49-02.png)

## 编写Collapse组件

### 不使用v-modal版本

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-01-26_23-26-13.png)

## 打包优化

### 1.CSS样式分包实现按需引入

**packages\core\vite.es.config.ts**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_17-04-32.png)

### 2.将组件相关的css放到theme文件夹下

1）修改**packages\core\vite.es.config.ts**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_17-26-57.png)

2）修改**packages\core\package.json**

> 这里删除了move-style的使用，后续会自己写一个插件实现该功能

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_17-25-43.png)

3）pnpm build 结果

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_17-28-19.png)

### 3.压缩umd

在core下执行命令：

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI\packages\core>
pnpm add vite-plugin-compression2 -D
```

修改**packages\core\vite.umd.config.ts**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_17-35-59.png)

压缩结果

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_17-36-55.png)

### 4.编写vite插件

功能：实现在build项目前删除上一次构建的项目相关文件以及在本次build项目后移动文件的位置。

执行命令：

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI\packages\core>
pnpm add shelljs -wD
pnpm add @types/shelljs -wD
```

删除相关的包：

**package.json**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_19-54-49.png)

删除相关命令：

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_20-52-59.png)

**packages\core\hooksPlugins.ts**

```ts
import { each, isFunction } from "lodash-es";
import shell from "shelljs";
/**
 如果传入了 rmfiles 参数，插件会在构建开始时删除指定的文件。
执行自定义操作： 如果传入了 beforeBuild 和 afterBuild 函数，它们会分别在构建开始前和结束后被调用。
 */
export default function hooksPlugin({
  rmfiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmfiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmfiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild();
    },
  };
}

```

修改**packages\core\vite.umd.config.ts**

```ts
//这里是使用vite对项目进行UMD形式的打包
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import vue from "@vitejs/plugin-vue";
import hooks from "./hooksPlugins";
import { resolve } from "path";
import { readFileSync } from "fs";
import shell from "shelljs";
import { delay } from "lodash-es";
//自己编写的在打包好后移动style.css文件的函数
const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyle() {
  try {
    //读文件的作用是保证打包完成后再移动文件
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist//umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  }
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    hooks({
      rmfiles: ["./dist/umd/", "./dist/index.css"],
      afterBuild: moveStyle,
    }),
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});

```

修改**packages\core\vite.es.config.ts**

```ts
//这里是使用vite对项目进行ES形式的打包
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import { resolve } from "path";
import { delay, filter, map, includes } from "lodash-es";
import shell from "shelljs";
import hooks from "./hooksPlugins";
//自己编写的在打包好后移动theme文件夹的函数
const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyle() {
  try {
    //读文件的作用是保证打包完成后再移动文件
    readdirSync("./dist/es/theme");
    shell.mv("./dist/es/theme", "./dist/");
  } catch (_) {
    delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  }
}
//同步获取指定目录下的所有子目录的名称。
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    hooks({
      rmfiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyle,
    }),
  ],
  build: {
    outDir: "dist/es",
    // css样式是否分包
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";

          if (includes(id, "/packages/hooks")) return "hooks";

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils";
          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});

```

执行build的效果：

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_20-53-58.png)

### 5.解决在core/index中使用@形式的路径打包后找不到的问题

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_21-57-46.png)

修改**tsconfig.build.json**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_22-04-49.png)

### 6.代码混淆 和压缩等配置

执行命令：

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI\packages\core>
  pnpm add terser @rollup/plugin-terser -D
```

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI> pnpm add cross-env -wD
```

修改**packages\core\vite.es.config.ts**

```ts
//这里是使用vite对项目进行ES形式的打包
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import { resolve } from "path";
import { delay, filter, map, includes } from "lodash-es";
import shell from "shelljs";
import hooks from "./hooksPlugins";
import terser from "@rollup/plugin-terser";
//自己编写的在打包好后移动theme文件夹的函数
const TRY_MOVE_STYLES_DELAY = 800 as const;
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
function moveStyle() {
  try {
    //读文件的作用是保证打包完成后再移动文件
    readdirSync("./dist/es/theme");
    shell.mv("./dist/es/theme", "./dist/");
  } catch (_) {
    delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  }
}
//同步获取指定目录下的所有子目录的名称。
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    hooks({
      rmfiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyle,
    }),

    terser({
      //配置压缩
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        passes: isProd ? 4 : 1,
        //条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          TEST: JSON.stringify(isTest),
        },
      },
      //配置格式化相关
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      //配置混淆
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false, //关闭默认混淆
    // css样式是否分包
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";

          if (includes(id, "/packages/hooks")) return "hooks";

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils";
          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});

```

**packages\core\vite.umd.config.ts**

```ts
//这里是使用vite对项目进行UMD形式的打包
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import vue from "@vitejs/plugin-vue";
import hooks from "./hooksPlugins";
import { resolve } from "path";
import { readFileSync } from "fs";
import shell from "shelljs";
import { delay } from "lodash-es";
import terser from "@rollup/plugin-terser";
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
//自己编写的在打包好后移动style.css文件的函数
const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyle() {
  try {
    //读文件的作用是保证打包完成后再移动文件
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist//umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  }
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    hooks({
      rmfiles: ["./dist/umd/", "./dist/index.css"],
      afterBuild: moveStyle,
    }),
    terser({
      //配置压缩
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        //条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});

```

条件编译后续相关修改：

1）新建**packages\core\printLogo.ts**

```ts
export default function () {
    if (PROD) {
      const logo = `
      
  __________________________________________________
  
       __                          _______  _______ 
      |  |--..---.-..-----..-----.|   |   ||_     _|
      |     ||  _  ||     ||  _  ||   |   | _|   |_ 
      |__|__||___._||__|__||___  ||_______||_______|
                           |_____|                                                 
  ____________________________________________________________________________________
                                 author:Hang
  `;
  
      const rainbowGradient = `
  background: linear-gradient(135deg, orange 60%, cyan);
  background-clip: text;
  color: transparent;
  font-size: 16px; 
  line-height: 1;
  font-family: monospace;
  font-weight: 600;
  `;
  
      console.info(`%c${logo}`, rainbowGradient);
    } else if (DEV) {
      console.log("[HangUI]:dev mode...");
    }
  }
```



2）新建**env.d.ts**

```
declare const PROD: boolean;
declare const DEV: boolean;
declare const TEST: boolean;
```

3）修改**tsconfig.build.json**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-11-18.png)

4）修改**tsconfig.json**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-11-43.png)

5）修改**packages\core\package.json**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-25-12.png)

6）修改**package.json**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-44-38.png)

7）修改**packages\core\index.ts**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-37-57.png)

8）演示

执行步骤：

在一个终端执行：

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI> pnpm build:dev
```

重新开一个终端执行：

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI> pnpm dev
```

当项目代码变化时，会自动重新打包，重新运行。

运行`build:dev`和`build`：

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-36-27.png)

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-37-10.png)

执行`pnpm dev`:

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-46-58.png)

### 7.展示按需引入的使用

修改**packages\play\.storybook\preview.js**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-16_23-52-07.png)

修改**packages\play\src\stories\Button.stories.ts**和**packages\play\src\stories\Collapse.stories.ts**

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-17_00-03-31.png)

结果：

执行命令：

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI\packages\play> pnpm build-storybook
http-server .\storybook-static
```

> 在网络请求中没有请求其他组件的内容，在js文件中也将Icon组件集成到了Button组件相关的js中

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-17_00-14-11.png)

## 实现Alert组件

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-17_16-08-41.png)

## 使用vitepress搭建组件文档

### 1）下载vitepress

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI> pnpm add -wD vitepress
```

### 2）初始化

```
PS D:\Codes\前端学习\18-elemetplus-clone\hangUI\packages\docs> pnpm vitepress init
```

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-18_15-56-32.png)

### 3）运行

```
 pnpm run docs:dev
```

## 提高测试用例覆盖率

当前测试用例覆盖率：

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-17_20-34-24.png)

提高后：

![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-18_15-19-34.png)
![](D:\Codes\前端学习\18-elemetplus-clone\hangUI\assert\Snipaste_2025-02-18_15-19-49.png)
