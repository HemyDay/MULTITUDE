import * as React from "react";

import { Label as UiLabel } from "@/components/ui/label";
import { InputOTP as UiInputOTP } from "@/components/ui/input-otp";

type FieldInputOTPProps = React.ComponentPropsWithoutRef<typeof UiInputOTP> & {
  label?: string;
  helperText?: string;
  className?: string;
};

function FieldInputOTP({
  label,
  helperText,
  className,
  ...props
}: FieldInputOTPProps) {
  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiInputOTP className={className} {...props} />
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldInputOTP };
