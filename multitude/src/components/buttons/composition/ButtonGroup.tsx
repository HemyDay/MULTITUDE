import * as React from "react";

import { UiButtonGroup } from "@/components/buttons/ux/Button/ButtonGroup";

function ButtonGroup({
  className,
  ...props
}: React.ComponentProps<typeof UiButtonGroup>) {
  return <UiButtonGroup className={className} {...props} />;
}

export { ButtonGroup };
