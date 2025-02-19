//对utils文件夹下的index.ts文件的测试用例
import { describe, it, expect } from "vitest";
import {
  typeIconMap,
  debugWarn,
  throwError,
  withInstall,
  makeInstaller,
  addUnit,
} from "../index"; // 根据你的文件路径引入
import { each } from "lodash-es";

describe("utils/index", () => {
  it("debugWarn should be exported", () => {
    expect(debugWarn).toBeDefined();
  });
  it("throwError should be exported", () => {
    expect(throwError).toBeDefined();
  });
  it("withInstall should be exported", () => {
    expect(withInstall).toBeDefined();
  });
  it("addUnit should be exported", () => {
    expect(addUnit).toBeDefined();
  });
  it("makeInstaller should be exported", () => {
    expect(makeInstaller).toBeDefined();
  });
  it("typeIconMap should be worked", () => {
    expect(typeIconMap).toBeDefined();
    each(
      [
        ["info", "circle-info"],
        ["success", "check-circle"],
        ["warning", "circle-exclamation"],
        ["danger", "circle-xmark"],
        ["error", "circle-xmark"],
      ],
      ([type, icon]) => {
        expect(typeIconMap.get(type)).toBe(icon);
      }
    );
  });
});
