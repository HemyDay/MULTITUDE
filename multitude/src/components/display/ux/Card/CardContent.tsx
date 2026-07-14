import * as React from "react";

import { CardContent } from "@/components/display/light/Card/CardContent";

function UiCardContent({
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) {
  return <CardContent className={className} {...props} />;
}

export { UiCardContent };
