import * as React from "react";
import { cn } from "@/lib/utils";

import {
  LightCard,
  LightCardAction,
  LightCardContent,
  LightCardDescription,
  LightCardFooter,
  LightCardHeader,
  LightCardTitle,
} from "@/components/light/Card";
import { uxSurfaceStyles } from "@/components/ux/styles";

function UiCard({
  className,
  ...props
}: React.ComponentProps<typeof LightCard>) {
  return (
    <LightCard className={cn(uxSurfaceStyles.root, className)} {...props} />
  );
}

function UiCardAction({
  className,
  ...props
}: React.ComponentProps<typeof LightCardAction>) {
  return <LightCardAction className={className} {...props} />;
}

function UiCardContent({
  className,
  ...props
}: React.ComponentProps<typeof LightCardContent>) {
  return <LightCardContent className={className} {...props} />;
}

function UiCardDescription({
  className,
  ...props
}: React.ComponentProps<typeof LightCardDescription>) {
  return (
    <LightCardDescription
      className={cn(uxSurfaceStyles.description, className)}
      {...props}
    />
  );
}

function UiCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof LightCardFooter>) {
  return (
    <LightCardFooter
      className={cn(uxSurfaceStyles.footer, className)}
      {...props}
    />
  );
}

function UiCardHeader({
  className,
  ...props
}: React.ComponentProps<typeof LightCardHeader>) {
  return (
    <LightCardHeader
      className={cn(uxSurfaceStyles.header, className)}
      {...props}
    />
  );
}

function UiCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof LightCardTitle>) {
  return (
    <LightCardTitle
      className={cn(uxSurfaceStyles.title, className)}
      {...props}
    />
  );
}

export {
  UiCard,
  UiCardAction,
  UiCardContent,
  UiCardDescription,
  UiCardFooter,
  UiCardHeader,
  UiCardTitle,
};
