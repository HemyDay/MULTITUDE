import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@/components/composition/Label";

const meta = {
  title: "Composition/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Email address",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
