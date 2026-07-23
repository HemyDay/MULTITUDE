import * as React from "react";

import { UiButtonGroupText } from "@/components/buttons/ux/Button/ButtonGroupText";

function ButtonGroupText({
  className,
  ...props
}: React.ComponentProps<typeof UiButtonGroupText>) {
  return <UiButtonGroupText className={className} {...props} />;
}

export { ButtonGroupText };
