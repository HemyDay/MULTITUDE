import * as React from "react";

import { Alert } from "@/components/feedback/light/Alert/Alert";

function UiAlert({ className, ...props }: React.ComponentProps<typeof Alert>) {
  return <Alert className={className} {...props} />;
}

export { UiAlert };
