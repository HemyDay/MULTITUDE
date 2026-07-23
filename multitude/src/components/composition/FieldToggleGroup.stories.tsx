import type { Meta, StoryObj } from "@storybook/react";

import { FieldToggleGroup } from "@/components/composition/FieldToggleGroup";

const options = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const meta = {
  title: "Composition/FieldToggleGroup",
  component: FieldToggleGroup,
  tags: ["autodocs"],
  args: {
    label: "Frequency",
    helperText: "Select one period",
    type: "single",
    defaultValue: "daily",
    options,
    disabled: false,
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
    },
    options: { control: "object" },
    children: { control: false },
  },
} satisfies Meta<typeof FieldToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
