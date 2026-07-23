import * as React from "react";

import { Badge } from "@/components/feedback/light/Badge/Badge";
import { cn } from "@/lib/utils";

function UiBadge({ className, ...props }: React.ComponentProps<typeof Badge>) {
  return <Badge className={cn(className, "select-none")} {...props} />;
}

export { UiBadge };
