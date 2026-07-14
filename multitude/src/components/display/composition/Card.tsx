import * as React from "react";

import { UiCard } from "@/components/display/ux/Card/Card";
import { UiCardAction } from "@/components/display/ux/Card/CardAction";
import { UiCardContent } from "@/components/display/ux/Card/CardContent";
import { UiCardDescription } from "@/components/display/ux/Card/CardDescription";
import { UiCardFooter } from "@/components/display/ux/Card/CardFooter";
import { UiCardHeader } from "@/components/display/ux/Card/CardHeader";
import { UiCardTitle } from "@/components/display/ux/Card/CardTitle";

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
