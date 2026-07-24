import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "@/components/composition/Container";
import { Button } from "@/components/composition/Button";

type ContainerStoryArgs = {
  title: string;
  description: string;
  body: string;
};

const meta = {
  title: "Composition/Container",
  component: Container,
  tags: ["autodocs"],
  args: {
    title: "Workspace",
    description: "Section composee avec header et contenu libre",
    body: "Le composant Container sert de structure de section reutilisable.",
  },
  argTypes: {
    children: { control: false },
    action: { control: false },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: ContainerStoryArgs) => (
    <Container
      title={args.title}
      description={args.description}
      action={<Button size="sm">Action</Button>}
    >
      <p className="text-sm text-muted-foreground">{args.body}</p>
    </Container>
  ),
};
