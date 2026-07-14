import * as React from "react";

import { Label as UiLabel } from "@/components/ui/label";
import { ToggleGroup as UiToggleGroup } from "@/components/ui/toggle-group";

type FieldToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof UiToggleGroup
> & {
  label?: string;
  helperText?: string;
  className?: string;
};

function FieldToggleGroup({
  label,
  helperText,
  className,
  ...props
}: FieldToggleGroupProps) {
  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiToggleGroup className={className} {...props} />
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldToggleGroup };
