import * as React from "react";

import { LightLabel } from "@/components/light/Label";
import { FORM_FIELD_LABEL_CLASS, uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

interface UiLabelProps extends React.ComponentProps<typeof LightLabel> {
  disabled?: boolean;
  required?: boolean;
  focused?: boolean;
}

function UiLabel({
  className,
  disabled = false,
  required = false,
  focused = false,
  ...props
}: UiLabelProps) {
  return (
    <LightLabel
      className={cn(
        FORM_FIELD_LABEL_CLASS,
        { "text-primary": focused },
        { [uxFormStyles.labelDisabled]: disabled },
        className,
      )}
      {...props}
    >
      {props.children}
      {required && !disabled && <span className="text-primary">*</span>}
    </LightLabel>
  );
}

export { UiLabel };
