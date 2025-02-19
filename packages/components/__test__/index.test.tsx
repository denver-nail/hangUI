import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import {
  HButton,
  HButtonGroup,
  HIcon,
  HAlert,
  HCollapse,
  HCollapseItem,
  HTooltip,
} from "../index.ts";
import { get, map } from "lodash-es";
const comps = [
  HAlert,
  HButton,
  HButtonGroup,
  HCollapse,
  HCollapseItem,
  HIcon,
  HTooltip,
] as Plugin[];
describe("component/index", () => {
  it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
    "%s should be exported",
    (_, component) => {
      expect(component).toBeDefined();
      expect(component.install).toBeDefined();
    }
  );
});
