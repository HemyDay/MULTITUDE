import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import {
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
  UiSelectValue,
} from "@/components/ux/Select";

type FieldSelectProps = React.ComponentProps<typeof UiSelect> & {
  label?: string;
  helperText?: string;
  className?: string;
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

function FieldSelect({
  label,
  helperText,
  className,
  options,
  placeholder,
  triggerClassName,
  contentClassName,
  children,
  ...props
}: FieldSelectProps) {
  return (
    <div className={className ? className : "space-y-2"}>
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiSelect {...props}>
        {children ? (
          children
        ) : (
          <>
            <UiSelectTrigger className={triggerClassName}>
              <UiSelectValue placeholder={placeholder} />
            </UiSelectTrigger>
            <UiSelectContent className={contentClassName}>
              {options?.map((option) => (
                <UiSelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </UiSelectItem>
              ))}
            </UiSelectContent>
          </>
        )}
      </UiSelect>
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldSelect };
