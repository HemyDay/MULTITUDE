import * as React from "react";

import { Label as UiLabel } from "@/components/ui/label";
import { NativeSelect as UiNativeSelect } from "@/components/ui/native-select";

interface FieldNativeSelectProps extends React.ComponentProps<
  typeof UiNativeSelect
> {
  label?: string;
  helperText?: string;
}

function FieldNativeSelect({
  label,
  helperText,
  className,
  ...props
}: FieldNativeSelectProps) {
  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiNativeSelect className={className} {...props} />
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldNativeSelect };
