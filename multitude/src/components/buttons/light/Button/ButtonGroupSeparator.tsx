import * as React from "react";

import { ButtonGroupSeparator as UiButtonGroupSeparator } from "@/components/ui/button-group";

function ButtonGroupSeparator({
  className,
  ...props
}: React.ComponentProps<typeof UiButtonGroupSeparator>) {
  return <UiButtonGroupSeparator className={className} {...props} />;
}

export { ButtonGroupSeparator };
