import * as React from "react";

import {
  UiCombobox,
  UiComboboxInput,
  UiComboboxContent,
  UiComboboxList,
  UiComboboxItem,
  UiComboboxEmpty,
} from "@/components/ux/Combobox";
import { UiLabel } from "@/components/ux/Label";

interface FieldComboboxProps extends React.ComponentProps<
  typeof UiComboboxInput
> {
  label?: string;
  helperText?: string;
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
  emptyText?: string;
  comboboxProps?: React.ComponentProps<typeof UiCombobox>;
}

function FieldCombobox({
  label,
  helperText,
  options,
  emptyText = "No results.",
  comboboxProps,
  className,
  children,
  ...props
}: FieldComboboxProps) {
  const hasOptions = Boolean(options && options.length > 0);

  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiCombobox {...comboboxProps}>
        <UiComboboxInput className={className} {...props}>
          {children ? (
            children
          ) : (
            <UiComboboxContent>
              <UiComboboxList>
                {hasOptions
                  ? options?.map((option) => (
                      <UiComboboxItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </UiComboboxItem>
                    ))
                  : null}
                <UiComboboxEmpty>{emptyText}</UiComboboxEmpty>
              </UiComboboxList>
            </UiComboboxContent>
          )}
        </UiComboboxInput>
      </UiCombobox>
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldCombobox };
