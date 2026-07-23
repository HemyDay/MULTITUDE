import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import {
  InputOTP as UiInputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type FieldInputOTPProps = Omit<
  React.ComponentPropsWithoutRef<typeof UiInputOTP>,
  "children" | "render"
> & {
  label?: string;
  helperText?: string;
  className?: string;
  slotCount?: number;
  children?: React.ReactNode;
};

function FieldInputOTP({
  label,
  helperText,
  slotCount,
  maxLength,
  className,
  children,
  ...props
}: FieldInputOTPProps) {
  const normalizedSlotCount =
    typeof slotCount === "number" && slotCount > 0
      ? slotCount
      : typeof maxLength === "number" && maxLength > 0
        ? maxLength
        : 6;

  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiInputOTP
        className={className}
        maxLength={normalizedSlotCount}
        {...props}
      >
        {children ? (
          children
        ) : (
          <InputOTPGroup>
            {Array.from({ length: normalizedSlotCount }, (_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        )}
      </UiInputOTP>
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldInputOTP };
