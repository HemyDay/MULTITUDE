import type { Meta, StoryObj } from "@storybook/react";

import { FieldSelect } from "@/components/composition/FieldSelect";

const options = [
  { label: "Alpha", value: "alpha" },
  { label: "Bravo", value: "bravo" },
  { label: "Charlie", value: "charlie", disabled: true },
];

const meta = {
  title: "Composition/FieldSelect",
  component: FieldSelect,
  tags: ["autodocs"],
  args: {
    label: "Team",
    helperText: "Choose one team",
    placeholder: "Select a team",
    defaultValue: "alpha",
    options,
    disabled: false,
  },
  argTypes: {
    options: { control: "object" },
    children: { control: false },
  },
} satisfies Meta<typeof FieldSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
