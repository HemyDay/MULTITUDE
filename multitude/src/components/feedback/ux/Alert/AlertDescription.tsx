import * as React from "react";

import { AlertDescription } from "@/components/feedback/light/Alert/AlertDescription";

function UiAlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDescription>) {
  return <AlertDescription className={className} {...props} />;
}

export { UiAlertDescription };
