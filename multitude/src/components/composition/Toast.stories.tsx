import type { Meta, StoryObj } from "@storybook/react";

import { Toast } from "@/components/composition/Toast";

const meta = {
  title: "Composition/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    title: "Toast Title",
    description: "This is a toast message description",
    variant: "info",
    showIcon: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "warning", "info", "destructive"],
    },
    showIcon: {
      control: "boolean",
    },
    onClose: {
      action: "closed",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => {
    const variants = ["success", "warning", "info", "destructive"] as const;

    return (
      <div className="space-y-4 p-4">
        {variants.map((variant) => (
          <Toast
            key={variant}
            {...args}
            variant={variant}
            title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`}
            description={`This is a ${variant} toast message with icon`}
          />
        ))}
      </div>
    );
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success!",
    description: "Your action has been completed successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "This action requires your attention.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "Here is some useful information for you.",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: "info",
    showIcon: false,
    title: "No Icon",
    description: "This toast is displayed without an icon.",
  },
};

export const WithCustomAction: Story = {
  args: {
    variant: "success",
    title: "Custom Action",
    description: "This toast has a custom action button.",
    action: <button className="text-sm font-medium underline">Undo</button>,
  },
};
