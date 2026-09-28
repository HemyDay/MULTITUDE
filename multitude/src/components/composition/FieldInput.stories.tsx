import type { Meta, StoryObj } from "@storybook/react";

import { FieldInput } from "@/components/composition/FieldInput";

const meta = {
  title: "Composition/FieldInput",
  component: FieldInput,
  tags: ["autodocs"],
  args: {
    label: "Full name",
    placeholder: "Ex: Lea Martin",
    helperText: "This field is required",
    error: "",
    disabled: false,
  },
} satisfies Meta<typeof FieldInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ErrorState: Story = {
  args: {
    error: "This value is invalid",
  },
};
