import * as React from "react";

import { CardAction } from "@/components/display/light/Card/CardAction";

function UiCardAction({
  className,
  ...props
}: React.ComponentProps<typeof CardAction>) {
  return <CardAction className={className} {...props} />;
}

export { UiCardAction };
