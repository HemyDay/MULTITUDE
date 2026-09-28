import * as React from "react";
import { cn } from "@/lib/utils";

import {
  LightDialog,
  LightDialogClose,
  LightDialogContent,
  LightDialogDescription,
  LightDialogFooter,
  LightDialogHeader,
  LightDialogOverlay,
  LightDialogPortal,
  LightDialogTitle,
  LightDialogTrigger,
} from "@/components/light/Dialog";
import { uxSurfaceStyles } from "@/components/ux/styles";

export const uxDialogStyles = {
  titleWithIcon: "inline-flex items-center gap-2",
  titleIcon: "size-5 shrink-0",
  titleVariantClassName: {
    default: "",
    info: "text-info",
    warning: "text-warning",
    success: "text-success",
    destructive: "text-destructive",
  },
} as const;

function UiDialog({ ...props }: React.ComponentProps<typeof LightDialog>) {
  return <LightDialog {...props} />;
}

function UiDialogClose({
  ...props
}: React.ComponentProps<typeof LightDialogClose>) {
  return <LightDialogClose {...props} />;
}

function UiDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof LightDialogContent>) {
  return (
    <LightDialogContent
      className={cn(uxSurfaceStyles.root, "sm:max-w-xl", className)}
      {...props}
    />
  );
}

function UiDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof LightDialogDescription>) {
  return (
    <LightDialogDescription
      className={cn(uxSurfaceStyles.description, className)}
      {...props}
    />
  );
}

function UiDialogFooter({
  className,
  ...props
}: React.ComponentProps<typeof LightDialogFooter>) {
  return (
    <LightDialogFooter
      className={cn(uxSurfaceStyles.footer, className)}
      {...props}
    />
  );
}

function UiDialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof LightDialogHeader>) {
  return (
    <LightDialogHeader
      className={cn(uxSurfaceStyles.header, className)}
      {...props}
    />
  );
}

function UiDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof LightDialogOverlay>) {
  return <LightDialogOverlay className={className} {...props} />;
}

function UiDialogPortal({
  ...props
}: React.ComponentProps<typeof LightDialogPortal>) {
  return <LightDialogPortal {...props} />;
}

function UiDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof LightDialogTitle>) {
  return (
    <LightDialogTitle
      className={cn(uxSurfaceStyles.title, className)}
      {...props}
    />
  );
}

function UiDialogTrigger({
  ...props
}: React.ComponentProps<typeof LightDialogTrigger>) {
  return <LightDialogTrigger {...props} />;
}

export {
  UiDialog,
  UiDialogClose,
  UiDialogContent,
  UiDialogDescription,
  UiDialogFooter,
  UiDialogHeader,
  UiDialogOverlay,
  UiDialogPortal,
  UiDialogTitle,
  UiDialogTrigger,
};
