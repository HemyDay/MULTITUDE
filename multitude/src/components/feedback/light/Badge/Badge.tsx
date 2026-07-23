import * as React from "react";

import { Badge as UiBadge } from "@/components/ui/badge";

function Badge({ className, ...props }: React.ComponentProps<typeof UiBadge>) {
  return <UiBadge className={className} {...props} />;
}

export { Badge };
