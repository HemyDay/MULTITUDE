import * as React from "react";

import { CardTitle } from "@/components/display/light/Card/CardTitle";

function UiCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof CardTitle>) {
  return <CardTitle className={className} {...props} />;
}

export { UiCardTitle };
