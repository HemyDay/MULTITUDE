import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from "@/components/composition/Dialog";
import { Button } from "@/components/composition/Button";

type DialogStoryArgs = {
  title: string;
  description: string;
  content: string;
  variantStyle?: "default" | "destructive" | "warning" | "info" | "success";
};

const meta = {
  title: "Composition/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    title: "Invite collaborator",
    description: "Send an invitation to your project workspace.",
    content:
      "Compose the dialog body with any content: forms, copy, or contextual actions.",
  },
  argTypes: {
    variantStyle: {
      control: "select",
      options: ["default", "destructive", "warning", "info", "success"],
    },
    trigger: { control: false },
    footer: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variantStyle: "info",
  },

  render: (args: DialogStoryArgs) => (
    <Dialog
      title={args.title}
      description={args.description}
      trigger={<Button>Open dialog</Button>}
      footer={<Button size="sm">Send invite</Button>}
    >
      <p className="text-sm text-muted-foreground">{args.content}</p>
    </Dialog>
  ),
};

export const ControlledOpen: Story = {
  args: {
    open: true,
    trigger: undefined,
    title: "Dialog preview",
    description: "Use controlled mode when state is managed outside.",
    showCloseButton: false,
    showFooterCloseButton: false,
  },
  render: (args: DialogStoryArgs) => (
    <Dialog
      open
      title={args.title}
      description={args.description}
      footer={<Button size="sm">Confirm</Button>}
      showCloseButton={false}
    >
      <p className="text-sm text-muted-foreground">{args.content}</p>
    </Dialog>
  ),
};

export const Variants: Story = {
  args: {
    variantStyle: "warning",
  },

  render: (args: DialogStoryArgs) => (
    <div className="grid gap-3 md:grid-cols-2">
      <Dialog
        open
        variantStyle="info"
        title="Information"
        description="This action will update your workspace settings."
        footer={<Button size="sm">Ok</Button>}
        showCloseButton={false}
      >
        <p className="text-sm text-muted-foreground">{args.content}</p>
      </Dialog>
      <Dialog
        open
        variantStyle="warning"
        title="Warning"
        description="Changes are pending review before publication."
        footer={<Button size="sm">Review</Button>}
        showCloseButton={false}
      >
        <p className="text-sm text-muted-foreground">{args.content}</p>
      </Dialog>
      <Dialog
        open
        variantStyle="success"
        title="Success"
        description="Your changes have been saved successfully."
        footer={<Button size="sm">Close</Button>}
        showCloseButton={false}
      >
        <p className="text-sm text-muted-foreground">{args.content}</p>
      </Dialog>
      <Dialog
        open
        variantStyle="destructive"
        title="Destructive action"
        description="This operation cannot be undone."
        footer={
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        }
        showCloseButton={false}
      >
        <p className="text-sm text-muted-foreground">{args.content}</p>
      </Dialog>
    </div>
  ),
};
