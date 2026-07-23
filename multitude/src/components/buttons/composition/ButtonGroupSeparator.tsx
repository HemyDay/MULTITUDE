import * as React from "react";

import { UiButtonGroupSeparator } from "@/components/buttons/ux/Button/ButtonGroupSeparator";

function ButtonGroupSeparator({
  className,
  ...props
}: React.ComponentProps<typeof UiButtonGroupSeparator>) {
  return <UiButtonGroupSeparator className={className} {...props} />;
}

export { ButtonGroupSeparator };
