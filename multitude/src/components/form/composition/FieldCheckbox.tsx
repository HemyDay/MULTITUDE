import * as React from "react";

import { UiCheckbox } from "@/components/form/ux/Checkbox";
import { UiLabel } from "@/components/form/ux/Label";

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
