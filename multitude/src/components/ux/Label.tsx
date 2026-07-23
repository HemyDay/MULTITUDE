import * as React from "react";

import { LightLabel } from "@/components/light/Label";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiLabel({
  className,
  ...props
}: React.ComponentProps<typeof LightLabel>) {
  return (
    <LightLabel
      className={cn(uxFormStyles.labelDisabled, className)}
      {...props}
    />
  );
}

export { UiLabel };
