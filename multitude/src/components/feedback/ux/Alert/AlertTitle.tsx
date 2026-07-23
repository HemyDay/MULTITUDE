import * as React from "react";

import { AlertTitle } from "@/components/feedback/light/Alert/AlertTitle";

function UiAlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertTitle>) {
  return <AlertTitle className={className} {...props} />;
}

export { UiAlertTitle };
