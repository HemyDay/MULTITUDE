import * as React from "react";

import { ComboboxInput } from "@/components/ui/combobox";
import { uxFormStyles } from "@/components/form/ux/styles";
import { cn } from "@/lib/utils";

function UiComboboxInput({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxInput>) {
  return (
    <ComboboxInput
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

export { UiComboboxInput };
