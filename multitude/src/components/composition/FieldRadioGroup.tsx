import * as React from "react";

import { UiRadioGroup, RadioGroupItem } from "@/components/ux/RadioGroup";
import { UiLabel } from "@/components/ux/Label";

interface FieldRadioGroupProps extends React.ComponentProps<typeof UiRadioGroup> {
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
  const isGroupDisabled = Boolean(props.disabled);

  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiRadioGroup className={className} {...props}>
        {children
          ? children
          : options?.map((option) => (
              <label
                key={option.value}
                className={
                  optionClassName ??
                  "flex flex-row items-center gap-4 text-sm text-foreground select-none cursor-default"
                }
              >
                <RadioGroupItem
                  value={option.value}
                  disabled={option.disabled || isGroupDisabled}
                />
                <span
                  className={
                    option.disabled || isGroupDisabled
                      ? "cursor-default"
                      : "cursor-pointer"
                  }
                >
                  {option.label}
                </span>
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
