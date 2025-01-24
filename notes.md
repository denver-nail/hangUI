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

希望这个解释对你有所帮助！如果有其他问题，可以随时问我 😊。
