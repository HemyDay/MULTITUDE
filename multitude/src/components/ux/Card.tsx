import * as React from "react";

import {
  LightCard,
  LightCardAction,
  LightCardContent,
  LightCardDescription,
  LightCardFooter,
  LightCardHeader,
  LightCardTitle,
} from "@/components/light/Card";

function UiCard({
  className,
  ...props
}: React.ComponentProps<typeof LightCard>) {
  return <LightCard className={className} {...props} />;
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
  return <LightCardDescription className={className} {...props} />;
}

function UiCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof LightCardFooter>) {
  return <LightCardFooter className={className} {...props} />;
}

function UiCardHeader({
  className,
  ...props
}: React.ComponentProps<typeof LightCardHeader>) {
  return <LightCardHeader className={className} {...props} />;
}

function UiCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof LightCardTitle>) {
  return <LightCardTitle className={className} {...props} />;
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
