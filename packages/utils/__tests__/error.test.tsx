//对utils文件夹下的error.ts文件的测试用例
import { describe, it, expect, vi } from "vitest";
import { throwError, debugWarn } from "../error";
describe("utils/error", () => {
  it("throwError should be worked", () => {
    expect(() => {
      throwError("scope", "msg");
    }).toThrowError("[scope]:msg");
  });
  it("debugWarn should be worked", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    debugWarn("scope", "msg");
    debugWarn(new SyntaxError("custom error"));
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [HUIError: [scope]:msg],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `);
  });
});
