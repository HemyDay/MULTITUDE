import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import { UiTextarea } from "@/components/ux/Textarea";

interface FieldTextareaProps extends React.ComponentProps<typeof UiTextarea> {
  label?: string;
  helperText?: string;
  error?: string;
}

function FieldTextarea({
  label,
  helperText,
  error,
  className,
  ...props
}: FieldTextareaProps) {
  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiTextarea className={className} {...props} />
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldTextarea };
