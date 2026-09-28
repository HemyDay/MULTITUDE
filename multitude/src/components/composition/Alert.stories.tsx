import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "@/components/composition/Alert";
import { Button } from "@/components/composition/Button";

const meta = {
  title: "Composition/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composable alert with title, description and action slot. Use `variant` to switch visual intent.",
      },
    },
  },
  args: {
    variant: "default",
    title: "Deploy complete",
    description: "Your latest release is now available.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
    action: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Alert {...args} action={<Button size="sm">Review</Button>} />
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="grid gap-3 md:grid-cols-2">
      <Alert
        {...args}
        variant="default"
        title="Information"
        description="Standard message with neutral styling."
        action={<Button size="sm">Open</Button>}
      />
      <Alert
        {...args}
        variant="destructive"
        title="Action required"
        description="This operation cannot be undone."
        action={
          <Button size="sm" variant="destructive">
            Resolve
          </Button>
        }
      />
    </div>
  ),
};
