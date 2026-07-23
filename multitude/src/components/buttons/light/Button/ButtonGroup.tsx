import * as React from "react";

import { ButtonGroup as UiButtonGroup } from "@/components/ui/button-group";

function ButtonGroup({
  className,
  ...props
}: React.ComponentProps<typeof UiButtonGroup>) {
  return <UiButtonGroup className={className} {...props} />;
}

export { ButtonGroup };
