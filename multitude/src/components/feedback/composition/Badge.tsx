import * as React from "react";

import { UiBadge } from "@/components/feedback/ux/Badge/Badge";

function Badge({ className, ...props }: React.ComponentProps<typeof UiBadge>) {
  return <UiBadge className={className} {...props} />;
}

export { Badge };
