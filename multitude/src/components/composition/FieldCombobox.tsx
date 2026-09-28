import * as React from "react";
import { FORM_FIELD_WRAPPER_CLASS } from "../ux/styles";
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
  const generatedId = React.useId();
  const inputId = props.id ?? generatedId;
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(true);
    props.onFocus?.({
      ...event,
      preventBaseUIHandler: () => {},
    } as any);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(false);
    props.onBlur?.({
      ...event,
      preventBaseUIHandler: () => {},
    } as any);
  };

  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      {label ? (
        <UiLabel htmlFor={inputId} focused={isFocused}>
          {label}
        </UiLabel>
      ) : null}
      <UiCombobox {...comboboxProps}>
        <UiComboboxInput
          id={inputId}
          className={className}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
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
