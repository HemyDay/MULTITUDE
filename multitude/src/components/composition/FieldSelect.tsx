import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <SelectTrigger className={triggerClassName}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={contentClassName}>
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
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
