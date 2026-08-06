import * as React from "react";

import { UiProgress } from "@/components/ux/Progress";

function Progress({
  className,
  ...props
}: React.ComponentProps<typeof UiProgress>) {
  return <UiProgress className={className} {...props} />;
}

export { Progress };
