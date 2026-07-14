import * as React from "react";

import { CardContent as UiCardContent } from "@/components/ui/card";

function CardContent({
  className,
  ...props
}: React.ComponentProps<typeof UiCardContent>) {
  return <UiCardContent className={className} {...props} />;
}

export { CardContent };
