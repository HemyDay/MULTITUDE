import type { Meta, StoryObj } from "@storybook/react";

import { FieldTextarea } from "@/components/composition/FieldTextArea";

const meta = {
  title: "Composition/FieldTextarea",
  component: FieldTextarea,
  tags: ["autodocs"],
  args: {
    label: "Description",
    placeholder: "Add notes",
    helperText: "Maximum 280 characters",
    error: "",
    disabled: false,
  },
} satisfies Meta<typeof FieldTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ErrorState: Story = {
  args: {
    error: "This description is too long",
  },
};
