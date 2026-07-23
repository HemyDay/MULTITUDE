import * as React from "react";

import { Badge } from "@/components/ui/badge";

function LightBadge({
  className,
  ...props
}: React.ComponentProps<typeof Badge>) {
  return <Badge className={className} {...props} />;
}

export { LightBadge };
