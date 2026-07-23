import * as React from "react";

import { LightSwitch } from "@/components/light/Switch";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiSwitch({
  className,
  ...props
}: React.ComponentProps<typeof LightSwitch>) {
  return (
    <LightSwitch
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

export { UiSwitch };
