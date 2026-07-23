import * as React from "react";

import { Alert as UiAlert } from "@/components/ui/alert";

function Alert({ className, ...props }: React.ComponentProps<typeof UiAlert>) {
  return <UiAlert className={className} {...props} />;
}

export { Alert };
