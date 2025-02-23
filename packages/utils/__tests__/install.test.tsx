//对utils文件夹下的install.ts文件的测试用例
import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, createApp } from "vue";
import { withInstall } from "../install";

const AppComponet = defineComponent({
  setup() {
    return () => <div>App</div>;
  },
});

const compA = withInstall(
  defineComponent({
    name: "compA",
    setup() {
      return () => <div>CompA</div>;
    },
  })
);
const compB = withInstall(
  defineComponent({
    name: "compB",
    setup() {
      return () => <div>CompB</div>;
    },
  })
);
describe("install", () => {
  it("witInstall should be  worked", () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComponet);
    app.use(compA).mount(wrapper.element);
    expect(compA.install).toBeDefined();
    expect(compB.install).toBeDefined();
    expect(app._context.components["compA"]).toBeTruthy();
    expect(app._context.components["compB"]).toBeFalsy();
  });
});
