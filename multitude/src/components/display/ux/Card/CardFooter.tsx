import * as React from "react";

import { CardFooter } from "@/components/display/light/Card/CardFooter";

function UiCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof CardFooter>) {
  return <CardFooter className={className} {...props} />;
}

export { UiCardFooter };
