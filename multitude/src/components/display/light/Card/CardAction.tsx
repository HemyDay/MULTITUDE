import * as React from "react";

import { CardAction as UiCardAction } from "@/components/ui/card";

function CardAction({
  className,
  ...props
}: React.ComponentProps<typeof UiCardAction>) {
  return <UiCardAction className={className} {...props} />;
}

export { CardAction };
