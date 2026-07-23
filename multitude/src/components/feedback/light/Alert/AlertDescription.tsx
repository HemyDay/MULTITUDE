import * as React from "react";

import { AlertDescription as UiAlertDescription } from "@/components/ui/alert";

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof UiAlertDescription>) {
  return <UiAlertDescription className={className} {...props} />;
}

export { AlertDescription };
