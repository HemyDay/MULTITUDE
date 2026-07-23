import * as React from "react";

import { UiAlert } from "@/components/feedback/ux/Alert/Alert";
import { UiAlertAction } from "@/components/feedback/ux/Alert/AlertAction";
import { UiAlertDescription } from "@/components/feedback/ux/Alert/AlertDescription";
import { UiAlertTitle } from "@/components/feedback/ux/Alert/AlertTitle";

interface AlertProps extends React.ComponentPropsWithoutRef<typeof UiAlert> {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

function Alert({
  title,
  description,
  action,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <UiAlert className={className} {...props}>
      {title || description ? (
        <div className="space-y-1">
          {title ? <UiAlertTitle>{title}</UiAlertTitle> : null}
          {description ? (
            <UiAlertDescription>{description}</UiAlertDescription>
          ) : null}
        </div>
      ) : null}
      {children}
      {action ? <UiAlertAction>{action}</UiAlertAction> : null}
    </UiAlert>
  );
}

export { Alert };
