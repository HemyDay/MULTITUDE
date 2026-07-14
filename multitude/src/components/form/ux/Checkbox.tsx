import * as React from "react";

import { Checkbox } from "@/components/form/light/Checkbox";

function UiCheckbox({
  className,
  ...props
}: React.ComponentProps<typeof Checkbox>) {
  return <Checkbox className={className} {...props} />;
}

export { UiCheckbox };
