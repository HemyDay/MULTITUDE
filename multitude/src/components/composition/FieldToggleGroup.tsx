import * as React from "react";

import { UiToggleGroup, UiToggleGroupItem } from "@/components/ux/ToggleGroup";
import { UiLabel } from "@/components/ux/Label";
import {
  FORM_FIELD_HELPER_CLASS,
  FORM_FIELD_WRAPPER_CLASS,
} from "../ux/styles";

type FieldToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof UiToggleGroup
> & {
  label?: string;
  helperText?: string;
  className?: string;
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
};

function FieldToggleGroup({
  label,
  helperText,
  className,
  options,
  children,
  ...props
}: FieldToggleGroupProps) {
  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      {label ? <UiLabel disabled={props.disabled}>{label}</UiLabel> : null}
      <UiToggleGroup className={className} {...props}>
        {children
          ? children
          : options?.map((option) => (
              <UiToggleGroupItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </UiToggleGroupItem>
            ))}
      </UiToggleGroup>
      {helperText ? (
        <p className={FORM_FIELD_HELPER_CLASS}>{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldToggleGroup };
