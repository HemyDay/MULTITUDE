import * as React from "react";

import { CardFooter as UiCardFooter } from "@/components/ui/card";

function CardFooter({
  className,
  ...props
}: React.ComponentProps<typeof UiCardFooter>) {
  return <UiCardFooter className={className} {...props} />;
}

export { CardFooter };
