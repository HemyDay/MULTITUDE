import * as React from "react";

import { Checkbox as UiCheckbox } from "@/components/ui/checkbox";
import { Label as UiLabel } from "@/components/ui/label";

interface FieldCheckboxProps extends React.ComponentProps<typeof UiCheckbox> {
  label?: string;
  helperText?: string;
}

function FieldCheckbox({
  label,
  helperText,
  className,
  ...props
}: FieldCheckboxProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        {label ? <UiLabel>{label}</UiLabel> : null}
        <UiCheckbox className={className} {...props} />
      </div>
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldCheckbox };
