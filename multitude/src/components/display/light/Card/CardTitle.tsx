import * as React from "react";

import { CardTitle as UiCardTitle } from "@/components/ui/card";

function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof UiCardTitle>) {
  return <UiCardTitle className={className} {...props} />;
}

export { CardTitle };
