import type { Meta, StoryObj } from "@storybook/react";

import { FieldCheckbox } from "@/components/composition/FieldCheckbox";

const meta = {
  title: "Composition/FieldCheckbox",
  component: FieldCheckbox,
  tags: ["autodocs"],
  args: {
    label: "Receive weekly updates",
    helperText: "One email per week",
    defaultChecked: true,
    disabled: false,
  },
} satisfies Meta<typeof FieldCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
