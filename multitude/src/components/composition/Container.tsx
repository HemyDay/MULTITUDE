import * as React from "react";
import { UiContainer } from "../ux/Container";

interface CardProps extends React.ComponentPropsWithoutRef<typeof UiContainer> {
  children: React.ReactNode;
}

function Container({ className, children, ...props }: CardProps) {
  return (
    <UiContainer className={className} {...props}>
      {children}
    </UiContainer>
  );
}

export { Container };
