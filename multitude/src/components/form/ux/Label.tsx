import * as React from "react";

import { Label } from "@/components/form/light/Label";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label className={cn(uxFormStyles.labelDisabled, className)} {...props} />
  );
}

export { UiLabel };
