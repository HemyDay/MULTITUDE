import type { Meta, StoryObj } from "@storybook/react";

import { FieldInputOTP } from "@/components/composition/FieldInputOTP";

const meta = {
  title: "Composition/FieldInputOTP",
  component: FieldInputOTP,
  tags: ["autodocs"],
  args: {
    label: "Verification code",
    helperText: "Enter the 6-digit code",
    maxLength: 6,
    slotCount: 6,
    disabled: false,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof FieldInputOTP>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
