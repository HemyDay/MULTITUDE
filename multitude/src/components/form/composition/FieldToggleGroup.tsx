import * as React from "react";

import { Label as UiLabel } from "@/components/ui/label";
import {
  ToggleGroup as UiToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

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
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiToggleGroup className={className} {...props}>
        {children
          ? children
          : options?.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
      </UiToggleGroup>
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldToggleGroup };
