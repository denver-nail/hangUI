import { describe, test, expect } from "vitest";
import { nextTick } from "vue";
import { message, closeAll } from "./methods";
//这个 rAF 函数使用了 requestAnimationFrame 和 nextTick，并结合了 Promise 来实现某种延迟执行的效果。
const rAF = async () => {
  return new Promise((res) => {
    //首先，通过 requestAnimationFrame 调用一个回调函数。这个回调将在浏览器的下一个重绘周期开始时执行。
    requestAnimationFrame(() => {
      //在这个回调函数内部，使用第二次 requestAnimationFrame 再次安排了一个回调函数。这一层是嵌套的，意味着这个回调会在浏览器的下一个重绘周期的下一帧执行。
      requestAnimationFrame(async () => {
        //在第二个 requestAnimationFrame 的回调中，首先调用 res(null)，即触发 Promise 的 resolve 方法，使得 Promise 状态变为 fulfilled，并返回 null。
        res(null);
        //在 res(null) 后，调用 await nextTick()。这意味着，接下来的代码将等待 Vue 完成当前 DOM 更新循环，确保在 DOM 更新完成后再执行其他操作。
        await nextTick();
      });
    });
  });
};

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element);
  const topValue = styles.getPropertyValue("top");
  return Number.parseFloat(topValue);
}

describe("message", () => {
  test("调用方法应该创建对应的 Message 组件", async () => {
    const handler = message({ message: "hello msg", duration: 0 });
    await rAF();
    expect(document.querySelector(".er-message")).toBeTruthy();
    handler.close();
    await rAF();
    expect(document.querySelector(".er-message")).toBeFalsy();
  });

  test("多次调用应该创建多个实例", async () => {
    message({ message: "hello msg", duration: 0 });
    message({ message: "hello msg2", duration: 0 });
    await rAF();
    expect(document.querySelectorAll(".er-message").length).toBe(2);
    closeAll();
    await rAF();
    expect(document.querySelectorAll(".er-message").length).toBe(0);
  });

  // test("创建多个实例应该设置正确的 offset", async () => {
  //   message({ message: "hello msg", duration: 0, offset: 100 });
  //   message({ message: "hello msg2", duration: 0, offset: 50 });
  //   await rAF();
  //   const elements = document.querySelectorAll(".er-message");
  //   expect(elements.length).toBe(2);
  //   // https://github.com/jsdom/jsdom/issues/1590
  //   // jsdom 中获取height的数值都为 0
  //   expect(getTopValue(elements[0])).toBe(100);
  //   expect(getTopValue(elements[1])).toBe(150);
  // });
});
