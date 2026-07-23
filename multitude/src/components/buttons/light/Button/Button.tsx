import * as React from "react";

import { Button as UiButton } from "@/components/ui/button";

function Button({
  className,
  ...props
}: React.ComponentProps<typeof UiButton>) {
  return <UiButton className={className} {...props} />;
}

export { Button };
