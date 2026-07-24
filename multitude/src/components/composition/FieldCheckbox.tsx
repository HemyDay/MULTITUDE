import * as React from "react";
import { UiCheckbox } from "@/components/ux/Checkbox";
import { UiLabel } from "@/components/ux/Label";
import { FORM_FIELD_WRAPPER_CLASS } from "../ux/styles";

interface FieldCheckboxProps extends React.ComponentProps<typeof UiCheckbox> {
  label?: string;
}

function FieldCheckbox({ label, className, ...props }: FieldCheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = props.id ?? generatedId;
  const isDisabled = Boolean(props.disabled);

  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      <div className="flex flex-row gap-2 items-center">
        <UiCheckbox id={checkboxId} className={className} {...props} />
        {label ? (
          <UiLabel
            htmlFor={checkboxId}
            disabled={isDisabled}
            className={isDisabled ? "cursor-default" : "cursor-pointer"}
            onClick={(event) => {
              if (isDisabled) {
                event.preventDefault();
                return;
              }
              event.preventDefault();
              const checkboxElement = document.getElementById(checkboxId);
              checkboxElement?.click();
              checkboxElement?.focus();
            }}
          >
            {label}
          </UiLabel>
        ) : null}
      </div>
    </div>
  );
}

export { FieldCheckbox };
