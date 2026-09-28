import * as React from "react";

import { LightCheckbox } from "@/components/light/Checkbox";

import { cn } from "@/lib/utils";
import { uxFormStyles } from "./styles";

function UiCheckbox({
  className,
  ...props
}: React.ComponentProps<typeof LightCheckbox>) {
  return (
    <LightCheckbox
      className={cn(
        uxFormStyles.controlFocus,
        uxFormStyles.controlDisabled,
        className,
        "cursor-pointer disabled:cursor-default",
      )}
      {...props}
    />
  );
}

export { UiCheckbox };
