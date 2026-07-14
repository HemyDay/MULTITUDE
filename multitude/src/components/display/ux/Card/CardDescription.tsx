import * as React from "react";

import { CardDescription } from "@/components/display/light/Card/CardDescription";

function UiCardDescription({
  className,
  ...props
}: React.ComponentProps<typeof CardDescription>) {
  return <CardDescription className={className} {...props} />;
}

export { UiCardDescription };
