import * as React from "react";

import { Select } from "@/components/form/light/Select";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiSelect({
  className,
  ...props
}: React.ComponentProps<typeof Select>) {
  return (
    <Select
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

export { UiSelect };
