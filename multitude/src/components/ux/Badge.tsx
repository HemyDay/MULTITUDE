import * as React from "react";

import { LightBadge } from "@/components/light/Badge";
import { cn } from "@/lib/utils";

function UiBadge({
  className,
  ...props
}: React.ComponentProps<typeof LightBadge>) {
  return <LightBadge className={cn(className, "select-none")} {...props} />;
}

export { UiBadge };
