import type { Meta, StoryObj } from "@storybook/vue3";
import { HCollapse, HCollapseItem } from "@purple-liu/hangui";
import "@purple-liu/hangui/dist/index.css";
type Story = StoryObj<typeof HCollapse>;

const meta: Meta<typeof HCollapse> = {
  title: "Example/Collapse",
  component: HCollapse,
  subcomponents: { HCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      HCollapse,
      HCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <h-collapse v-bind="args">
      <h-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </h-collapse-item>
      <h-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </h-collapse-item>
      <h-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </h-collapse-item>
    </h-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;
