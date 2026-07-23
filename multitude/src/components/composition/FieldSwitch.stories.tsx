import type { Meta, StoryObj } from "@storybook/react";

import { FieldSwitch } from "@/components/composition/FieldSwitch";

const meta = {
  title: "Composition/FieldSwitch",
  component: FieldSwitch,
  tags: ["autodocs"],
  args: {
    label: "Enable notifications",
    helperText: "Push enabled",
    defaultChecked: true,
    disabled: false,
  },
} satisfies Meta<typeof FieldSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
