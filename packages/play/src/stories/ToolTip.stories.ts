import type { StoryObj, Meta } from "@storybook/vue3";

import { fn } from "@storybook/test";
import { HTooltip } from "@purple-liu/hangui";
import "@purple-liu/hangui/dist/theme/Tooltip.css";

type Story = StoryObj<typeof HTooltip>;

const meta: Meta<typeof HTooltip> = {
  title: "Example/Tooltip",
  component: HTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select",
      },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    "onVisible-change": fn(),
  },
};

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    trigger: "hover",
  },
  render: (args) => ({
    components: { HTooltip },
    setup() {
      return {
        args,
      };
    },
    template: `
      <HTooltip v-bind="args">
          <div style="height:30px;width:200px;background:red;padding:auto">trigger</div>
      </HTooltip>
    `,
  }),
};

export default meta;
