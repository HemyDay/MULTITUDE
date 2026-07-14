import * as React from "react";

import { CardHeader as UiCardHeader } from "@/components/ui/card";

function CardHeader({
  className,
  ...props
}: React.ComponentProps<typeof UiCardHeader>) {
  return <UiCardHeader className={className} {...props} />;
}

export { CardHeader };
