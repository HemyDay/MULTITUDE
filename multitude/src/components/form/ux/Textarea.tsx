import * as React from "react";

import { Textarea } from "@/components/form/light/Textarea";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      className={cn(
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
