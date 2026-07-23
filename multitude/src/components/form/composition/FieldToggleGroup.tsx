import * as React from "react";

import { UiLabel } from "@/components/form/ux/Label";
import {
  UiToggleGroup,
  ToggleGroupItem,
} from "@/components/form/ux/ToggleGroup";

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
