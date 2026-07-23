import * as React from "react";

import {
  UiCard,
  UiCardAction,
  UiCardContent,
  UiCardDescription,
  UiCardFooter,
  UiCardHeader,
  UiCardTitle,
} from "@/components/ux/Card";

interface CardProps extends React.ComponentPropsWithoutRef<typeof UiCard> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

function Card({
  title,
  description,
  footer,
  actions,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <UiCard className={className} {...props}>
      {title || description || actions ? (
        <UiCardHeader>
          {title ? <UiCardTitle>{title}</UiCardTitle> : null}
          {description ? (
            <UiCardDescription>{description}</UiCardDescription>
          ) : null}
          {actions ? <UiCardAction>{actions}</UiCardAction> : null}
        </UiCardHeader>
      ) : null}
      <UiCardContent>{children}</UiCardContent>
      {footer ? <UiCardFooter>{footer}</UiCardFooter> : null}
    </UiCard>
  );
}

export { Card };
