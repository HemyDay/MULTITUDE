import * as React from "react";

import { ButtonGroupText as UiButtonGroupText } from "@/components/ui/button-group";

function ButtonGroupText({
  className,
  ...props
}: React.ComponentProps<typeof UiButtonGroupText>) {
  return <UiButtonGroupText className={className} {...props} />;
}

export { ButtonGroupText };
