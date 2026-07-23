import * as React from "react";

import { Switch } from "@/components/form/light/Switch";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiSwitch({
  className,
  ...props
}: React.ComponentProps<typeof Switch>) {
  return (
    <Switch
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
