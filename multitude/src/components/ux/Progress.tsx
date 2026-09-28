import * as React from "react";

import { LightProgress } from "@/components/light/Progress";

function UiProgress({
  className,
  ...props
}: React.ComponentProps<typeof LightProgress>) {
  return <LightProgress className={className} {...props} />;
}

export { UiProgress };
