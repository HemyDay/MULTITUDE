import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/composition/Avatar";

const meta = {
  title: "Composition/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Amanda Sire",
    src: undefined,
    size: "default",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    src: {
      control: "text",
      description: "Image URL",
    },
    name: {
      control: "text",
      description: "Full name used for initials fallback",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    name: "Amanda Sire",
  },
};

export const FallbackInitials: Story = {
  args: {
    name: "John Doe",
    src: undefined,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="default" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};

export const WithBadge: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=5",
    name: "Jane Smith",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarBadge />
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar
        src="https://i.pravatar.cc/150?img=1"
        name="Alice"
        size="default"
      />
      <Avatar src="https://i.pravatar.cc/150?img=2" name="Bob" size="default" />
      <Avatar name="Charlie" size="default" />
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
