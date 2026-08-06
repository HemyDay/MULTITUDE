import * as React from "react";

import { Progress } from "@/components/ui/progress";

function LightProgress({
  className,
  ...props
}: React.ComponentProps<typeof Progress>) {
  return <Progress className={className} {...props} />;
}

export { LightProgress };
