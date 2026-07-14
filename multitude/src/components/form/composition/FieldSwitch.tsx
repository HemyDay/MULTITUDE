import * as React from "react";

import { Label as UiLabel } from "@/components/ui/label";
import { Switch as UiSwitch } from "@/components/ui/switch";

interface FieldSwitchProps extends React.ComponentProps<typeof UiSwitch> {
  label?: string;
  helperText?: string;
}

function FieldSwitch({
  label,
  helperText,
  className,
  ...props
}: FieldSwitchProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        {label ? <UiLabel>{label}</UiLabel> : null}
        <UiSwitch className={className} {...props} />
      </div>
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldSwitch };
