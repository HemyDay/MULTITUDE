import * as React from "react";

import { CardHeader } from "@/components/display/light/Card/CardHeader";

function UiCardHeader({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return <CardHeader className={className} {...props} />;
}

export { UiCardHeader };
