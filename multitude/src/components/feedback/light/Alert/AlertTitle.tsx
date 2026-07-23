import * as React from "react";

import { AlertTitle as UiAlertTitle } from "@/components/ui/alert";

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof UiAlertTitle>) {
  return <UiAlertTitle className={className} {...props} />;
}

export { AlertTitle };
