import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import { UiSlider } from "@/components/ux/Slider";
import {
  FORM_FIELD_HELPER_CLASS,
  FORM_FIELD_WRAPPER_CLASS,
} from "../ux/styles";

interface FieldSliderProps extends React.ComponentProps<typeof UiSlider> {
  label?: string;
  helperText?: string;
}

function FieldSlider({
  label,
  helperText,
  className,
  ...props
}: FieldSliderProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      {label ? (
        <UiLabel focused={isFocused} disabled={props.disabled}>
          {label}
        </UiLabel>
      ) : null}
      <UiSlider
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
      {helperText ? (
        <p className={FORM_FIELD_HELPER_CLASS}>{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldSlider };
