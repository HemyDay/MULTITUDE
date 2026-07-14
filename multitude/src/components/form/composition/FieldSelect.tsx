import * as React from "react";

import { Label as UiLabel } from "@/components/ui/label";
import { Select as UiSelect } from "@/components/ui/select";

type FieldSelectProps = React.ComponentProps<typeof UiSelect> & {
  label?: string;
  helperText?: string;
  className?: string;
};

function FieldSelect({
  label,
  helperText,
  className,
  ...props
}: FieldSelectProps) {
  return (
    <div className={className ? className : "space-y-2"}>
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiSelect {...props} />
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldSelect };
