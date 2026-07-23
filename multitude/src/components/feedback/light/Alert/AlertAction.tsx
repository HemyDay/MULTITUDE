import * as React from "react";

import { AlertAction as UiAlertAction } from "@/components/ui/alert";

function AlertAction({
  className,
  ...props
}: React.ComponentProps<typeof UiAlertAction>) {
  return <UiAlertAction className={className} {...props} />;
}

export { AlertAction };
