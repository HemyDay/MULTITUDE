import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@/components/composition/Card";
import { Button } from "@/components/composition/Button";

type CardStoryArgs = {
  title?: string;
  description?: string;
  content: string;
  footerText?: string;
};

const meta = {
  title: "Composition/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Plan Pro",
    description: "Access to all premium capabilities",
    content:
      "Use this card to compose higher-level content areas with a shared visual structure.",
    footerText: "Continue",
  },
  argTypes: {
    children: { control: false },
    footer: { control: false },
    actions: { control: false },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: CardStoryArgs) => (
    <Card
      title={args.title}
      description={args.description}
      actions={
        <Button size="sm" variant="outline">
          Edit
        </Button>
      }
      footer={
        args.footerText ? (
          <Button size="sm">{args.footerText}</Button>
        ) : undefined
      }
    >
      <p className="text-sm text-muted-foreground">{args.content}</p>
    </Card>
  ),
};
