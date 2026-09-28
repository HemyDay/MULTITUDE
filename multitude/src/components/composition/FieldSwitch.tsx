import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import { UiSwitch } from "@/components/ux/Switch";
import {
  FORM_FIELD_HELPER_CLASS,
  FORM_FIELD_WRAPPER_CLASS,
} from "../ux/styles";

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
  const generatedId = React.useId();
  const switchId = props.id ?? generatedId;
  const isDisabled = Boolean(props.disabled);

  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      <div className="flex flex-row gap-2 items-center">
        <UiSwitch
          id={switchId}
          className={`${isDisabled ? "cursor-default" : "cursor-pointer"}${className ? ` ${className}` : ""}`}
          {...props}
        />
        {label ? (
          <UiLabel
            htmlFor={switchId}
            disabled={isDisabled}
            className={isDisabled ? "cursor-default" : "cursor-pointer"}
          >
            {label}
          </UiLabel>
        ) : null}
      </div>
      {helperText ? (
        <p className={FORM_FIELD_HELPER_CLASS}>{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldSwitch };
