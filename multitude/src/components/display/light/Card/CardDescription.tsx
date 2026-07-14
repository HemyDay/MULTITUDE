import * as React from "react";

import { CardDescription as UiCardDescription } from "@/components/ui/card";

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof UiCardDescription>) {
  return <UiCardDescription className={className} {...props} />;
}

export { CardDescription };
