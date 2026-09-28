import type { Meta, StoryObj } from "@storybook/react";

import { FieldRadioGroup } from "@/components/composition/FieldRadioGroup";

const options = [
  { label: "Alpha", value: "alpha" },
  { label: "Bravo", value: "bravo" },
  { label: "Charlie", value: "charlie", disabled: true },
];

const meta = {
  title: "Composition/FieldRadioGroup",
  component: FieldRadioGroup,
  tags: ["autodocs"],
  args: {
    label: "Priority",
    helperText: "Select one value",
    defaultValue: "alpha",
    options,
    disabled: false,
  },
  argTypes: {
    options: { control: "object" },
    children: { control: false },
  },
} satisfies Meta<typeof FieldRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
