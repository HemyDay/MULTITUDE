import * as React from "react";

import { Checkbox } from "@/components/form/light/Checkbox";

import { cn } from "@/lib/utils";
import { uxFormStyles } from "./styles";

function UiCheckbox({
  className,
  ...props
}: React.ComponentProps<typeof Checkbox>) {
  return (
    <Checkbox
      className={cn(
        uxFormStyles.controlFocus,
        uxFormStyles.controlDisabled,
        className,
        "cursor-pointer disabled:cursor-auto",
      )}
      {...props}
    />
  );
}

export { UiCheckbox };
