// 这是Button组件的单元测试
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
