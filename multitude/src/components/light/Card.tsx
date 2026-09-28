import * as React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LightCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return <Card className={className} {...props} />;
}

function LightCardAction({
  className,
  ...props
}: React.ComponentProps<typeof CardAction>) {
  return <CardAction className={className} {...props} />;
}

function LightCardContent({
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) {
  return <CardContent className={className} {...props} />;
}

function LightCardDescription({
  className,
  ...props
}: React.ComponentProps<typeof CardDescription>) {
  return <CardDescription className={className} {...props} />;
}

function LightCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof CardFooter>) {
  return <CardFooter className={className} {...props} />;
}

function LightCardHeader({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return <CardHeader className={className} {...props} />;
}

function LightCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof CardTitle>) {
  return <CardTitle className={className} {...props} />;
}

export {
  LightCard,
  LightCardAction,
  LightCardContent,
  LightCardDescription,
  LightCardFooter,
  LightCardHeader,
  LightCardTitle,
};
