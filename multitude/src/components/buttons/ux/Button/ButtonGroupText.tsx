import * as React from "react";

import { ButtonGroupText } from "@/components/buttons/light/Button/ButtonGroupText";

function UiButtonGroupText({
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroupText>) {
  return <ButtonGroupText className={className} {...props} />;
}

export { UiButtonGroupText };
