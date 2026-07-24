import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import { UiTextarea } from "@/components/ux/Textarea";
import {
  FORM_FIELD_ERROR_CLASS,
  FORM_FIELD_HELPER_CLASS,
  FORM_FIELD_WRAPPER_CLASS,
} from "../ux/styles";

interface FieldTextareaProps extends React.ComponentProps<typeof UiTextarea> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

function FieldTextarea({
  label,
  helperText,
  error,
  required = false,
  className,
  ...props
}: FieldTextareaProps) {
  const generatedId = React.useId();
  const textareaId = props.id ?? generatedId;
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      {label ? (
        <UiLabel
          htmlFor={textareaId}
          required={required}
          focused={isFocused}
          disabled={props.disabled}
        >
          {label}
        </UiLabel>
      ) : null}
      <UiTextarea
        id={textareaId}
        className={className}
        {...props}
        onFocus={(event) => {
          setIsFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          props.onBlur?.(event);
        }}
      />
      {error ? (
        <p className={FORM_FIELD_ERROR_CLASS}>{error}</p>
      ) : helperText ? (
        <p className={FORM_FIELD_HELPER_CLASS}>{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldTextarea };
