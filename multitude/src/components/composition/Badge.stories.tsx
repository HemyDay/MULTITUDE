import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@/components/composition/Badge";

const meta = {
  title: "Composition/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Active",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => {
    const variants = [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
      "link",
    ] as const;

    return (
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Badge key={variant} {...args} variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
    );
  },
};
