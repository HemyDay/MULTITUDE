import * as React from "react";

import {
  UiRadioGroup as RadioGroup,
  RadioGroupItem,
} from "@/components/form/ux/RadioGroup";
import { UiLabel as Label } from "@/components/form/ux/Label";

interface FieldRadioGroupProps extends React.ComponentProps<typeof RadioGroup> {
  label?: string;
  helperText?: string;
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
  optionClassName?: string;
}

function FieldRadioGroup({
  label,
  helperText,
  className,
  options,
  optionClassName,
  children,
  ...props
}: FieldRadioGroupProps) {
  return (
    <div className="space-y-2">
      {label ? <Label>{label}</Label> : null}
      <RadioGroup className={className} {...props}>
        {children
          ? children
          : options?.map((option) => (
              <label
                key={option.value}
                className={
                  optionClassName ??
                  "flex flex-row items-center gap-4 text-sm text-foreground"
                }
              >
                <RadioGroupItem
                  value={option.value}
                  disabled={option.disabled}
                />
                <span>{option.label}</span>
              </label>
            ))}
      </RadioGroup>
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldRadioGroup };
