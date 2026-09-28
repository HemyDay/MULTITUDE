import type { Meta, StoryObj } from "@storybook/react";

import {
  ButtonGroup,
  type ButtonGroupItem,
} from "@/components/composition/ButtonGroup";

const defaultItems: ButtonGroupItem[] = [
  { label: "Backlog", type: "text" },
  { label: "Approve", type: "button", variant: "default" },
  { label: "Reject", type: "button", variant: "secondary" },
];

const meta = {
  title: "Composition/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  args: {
    items: defaultItems,
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};
