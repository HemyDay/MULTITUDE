import * as React from "react";

import { UiToast } from "@/components/ux/Toast";

interface ToastProps extends React.ComponentProps<typeof UiToast> {
  onClose?: () => void;
}

function Toast({
  title,
  description,
  action,
  onClose,
  className,
  children,
  ...props
}: ToastProps) {
  return (
    <UiToast
      className={className}
      title={title}
      description={description}
      action={action}
      {...props}
    >
      {children}
    </UiToast>
  );
}

export { Toast };
