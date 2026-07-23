import * as React from "react";

import { Badge } from "@/components/feedback/light/Badge/Badge";

function UiBadge({ className, ...props }: React.ComponentProps<typeof Badge>) {
  return <Badge className={className} {...props} />;
}

export { UiBadge };
