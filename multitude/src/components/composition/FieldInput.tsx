import * as React from "react";

import { UiInput } from "@/components/ux/Input";
import { Label } from "@/components/composition/Label";
import { FORM_FIELD_WRAPPER_CLASS } from "../ux/styles";

interface FieldInputProps extends React.ComponentProps<typeof UiInput> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

function FieldInput({
  label,
  helperText,
  error,
  required = false,
  className,
  ...props
}: FieldInputProps) {
  const generatedId = React.useId();
  const inputId = props.id ?? generatedId;
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(true);
    props.onFocus?.(event);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(false);
    props.onBlur?.(event);
  };

  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      {label ? (
        <Label
          htmlFor={inputId}
          required={required}
          focused={isFocused}
          disabled={props.disabled}
        >
          {label}
        </Label>
      ) : null}
      <UiInput
        id={inputId}
        className={className}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldInput };
