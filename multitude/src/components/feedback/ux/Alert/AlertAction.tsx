import * as React from "react";

import { AlertAction } from "@/components/feedback/light/Alert/AlertAction";

function UiAlertAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertAction>) {
  return <AlertAction className={className} {...props} />;
}

export { UiAlertAction };
