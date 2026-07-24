import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import {
  FORM_FIELD_HELPER_CLASS,
  FORM_FIELD_WRAPPER_CLASS,
} from "../ux/styles";
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
  const generatedId = React.useId();
  const inputId = props.id ?? generatedId;
  const [isFocused, setIsFocused] = React.useState(false);

  const normalizedSlotCount =
    typeof slotCount === "number" && slotCount > 0
      ? slotCount
      : typeof maxLength === "number" && maxLength > 0
        ? maxLength
        : 6;

  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      {label ? (
        <UiLabel
          htmlFor={inputId}
          focused={isFocused}
          disabled={props.disabled}
        >
          {label}
        </UiLabel>
      ) : null}
      <UiInputOTP
        id={inputId}
        className={className}
        maxLength={normalizedSlotCount}
        {...props}
        onFocus={(event) => {
          setIsFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          props.onBlur?.(event);
        }}
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
        <p className={FORM_FIELD_HELPER_CLASS}>{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldInputOTP };
