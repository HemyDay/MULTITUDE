import * as React from "react";

import { LightTextarea } from "@/components/light/Textarea";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiTextarea({
  className,
  ...props
}: React.ComponentProps<typeof LightTextarea>) {
  return (
    <LightTextarea
      className={cn(
        uxFormStyles.fieldDefault,
        uxFormStyles.fieldFocus,
        uxFormStyles.fieldPlaceholder,
        uxFormStyles.fieldDisabled,
        className,
      )}
      {...props}
    />
  );
}

export { UiTextarea };
