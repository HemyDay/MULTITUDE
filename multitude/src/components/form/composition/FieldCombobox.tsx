import * as React from "react";

import { Label as UiLabel } from "@/components/ui/label";
import { ComboboxInput as UiComboboxInput } from "@/components/ui/combobox";

interface FieldComboboxProps extends React.ComponentProps<
  typeof UiComboboxInput
> {
  label?: string;
  helperText?: string;
}

function FieldCombobox({
  label,
  helperText,
  className,
  ...props
}: FieldComboboxProps) {
  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiComboboxInput className={className} {...props} />
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldCombobox };
