"use client";

import { Dialog } from "@/components/composition/Dialog";
import * as React from "react";

type KanbanCardDetailsProps = {
  trigger: React.ReactNode;
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
};

export const KanbanCardDetails = ({
  trigger,
  title,
  description,
  children,
  contentClassName,
}: KanbanCardDetailsProps) => {
  return (
    <Dialog
      contentClassName={contentClassName ?? "sm:max-w-2xl"}
      title={title}
      description={description}
      trigger={trigger}
    >
      {children}
    </Dialog>
  );
};
