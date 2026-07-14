import * as React from "react";

import { Input as UiInput } from "@/components/ui/input";
import { Label as UiLabel } from "@/components/ui/label";

interface FieldInputProps extends React.ComponentProps<typeof UiInput> {
  label?: string;
  helperText?: string;
  error?: string;
}

function FieldInput({
  label,
  helperText,
  error,
  className,
  ...props
}: FieldInputProps) {
  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiInput className={className} {...props} />
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldInput };
