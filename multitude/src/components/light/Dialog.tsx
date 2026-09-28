import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function LightDialog({ ...props }: React.ComponentProps<typeof Dialog>) {
  return <Dialog {...props} />;
}

function LightDialogClose({
  ...props
}: React.ComponentProps<typeof DialogClose>) {
  return <DialogClose {...props} />;
}

function LightDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return <DialogContent className={className} {...props} />;
}

function LightDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return <DialogDescription className={className} {...props} />;
}

function LightDialogFooter({
  className,
  ...props
}: React.ComponentProps<typeof DialogFooter>) {
  return <DialogFooter className={className} {...props} />;
}

function LightDialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof DialogHeader>) {
  return <DialogHeader className={className} {...props} />;
}

function LightDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogOverlay>) {
  return <DialogOverlay className={className} {...props} />;
}

function LightDialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPortal>) {
  return <DialogPortal {...props} />;
}

function LightDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle className={className} {...props} />;
}

function LightDialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger {...props} />;
}

export {
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
};
