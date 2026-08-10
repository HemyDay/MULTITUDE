"use client";

import { Dialog } from "@/components/composition/Dialog";
import * as React from "react";

type KanbanCardDetailsProps = {
  trigger: React.ReactNode;
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
} & Omit<
  React.ComponentProps<typeof Dialog>,
  "trigger" | "title" | "description" | "children" | "contentClassName"
>;

export const KanbanCardDetails = ({
  trigger,
  title,
  description,
  children,
  contentClassName,
  ...dialogProps
}: KanbanCardDetailsProps) => {
  return (
    <Dialog
      {...dialogProps}
      contentClassName={contentClassName ?? "sm:max-w-2xl"}
      title={title}
      description={description}
      trigger={trigger}
    >
      {children}
    </Dialog>
  );
};
