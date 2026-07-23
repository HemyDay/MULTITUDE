import * as React from "react";

import { ButtonGroupSeparator } from "@/components/buttons/light/Button/ButtonGroupSeparator";

function UiButtonGroupSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroupSeparator>) {
  return <ButtonGroupSeparator className={className} {...props} />;
}

export { UiButtonGroupSeparator };
