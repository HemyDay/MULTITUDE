import type { Meta, StoryObj } from "@storybook/react";

import { FieldCombobox } from "@/components/composition/FieldCombobox";

const options = [
  { label: "Alpha", value: "alpha" },
  { label: "Bravo", value: "bravo" },
  { label: "Charlie", value: "charlie", disabled: true },
];

const meta = {
  title: "Composition/FieldCombobox",
  component: FieldCombobox,
  tags: ["autodocs"],
  args: {
    label: "Project",
    helperText: "Choose one option",
    placeholder: "Search...",
    options,
    emptyText: "No results.",
  },
  argTypes: {
    children: { control: false },
    comboboxProps: { control: "object" },
    options: { control: "object" },
  },
} satisfies Meta<typeof FieldCombobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
