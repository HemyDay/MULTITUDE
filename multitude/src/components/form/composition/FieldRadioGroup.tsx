import * as React from "react";

import { RadioGroup as UiRadioGroup } from "@/components/ui/radio-group";
import { Label as UiLabel } from "@/components/ui/label";

interface FieldRadioGroupProps extends React.ComponentProps<
  typeof UiRadioGroup
> {
  label?: string;
  helperText?: string;
}

function FieldRadioGroup({
  label,
  helperText,
  className,
  ...props
}: FieldRadioGroupProps) {
  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiRadioGroup className={className} {...props} />
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldRadioGroup };
