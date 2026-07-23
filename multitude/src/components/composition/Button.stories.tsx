import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/composition/Button";

const meta = {
  title: "Composition/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Confirm",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Button {...args} startIcon={Check} endIcon={ArrowRight} />,
};

export const Variants: Story = {
  render: (args) => {
    const variants = [
      "default",
      "outline",
      "secondary",
      "ghost",
      "destructive",
      "link",
    ] as const;

    return (
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <Button key={variant} {...args} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    const sizes = ["xs", "sm", "default", "lg"] as const;

    return (
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={size} {...args} size={size}>
            {size}
          </Button>
        ))}
      </div>
    );
  },
};
