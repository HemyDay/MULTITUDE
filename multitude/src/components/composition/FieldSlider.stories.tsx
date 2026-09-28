import type { Meta, StoryObj } from "@storybook/react";

import { FieldSlider } from "@/components/composition/FieldSlider";

const meta = {
  title: "Composition/FieldSlider",
  component: FieldSlider,
  tags: ["autodocs"],
  args: {
    label: "Volume",
    helperText: "Adjust value",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [45],
    disabled: false,
  },
  argTypes: {
    defaultValue: { control: "object" },
  },
} satisfies Meta<typeof FieldSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
