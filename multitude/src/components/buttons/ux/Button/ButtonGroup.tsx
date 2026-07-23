import * as React from "react";

import { ButtonGroup } from "@/components/buttons/light/Button/ButtonGroup";

function UiButtonGroup({
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroup>) {
  return <ButtonGroup className={className} {...props} />;
}

export { UiButtonGroup };
