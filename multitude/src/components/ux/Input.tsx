import * as React from "react";

import { LightInput } from "@/components/light/Input";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiInput({
  className,
  ...props
}: React.ComponentProps<typeof LightInput>) {
  return (
    <LightInput
      className={cn(
        uxFormStyles.fieldDefault,
        uxFormStyles.fieldFocus,
        uxFormStyles.fieldPlaceholder,
        uxFormStyles.fieldDisabled,
        "focus-visible:border-primary focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  );
}

export { UiInput };
