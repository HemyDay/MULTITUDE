import * as React from "react";

import { UiLabel } from "@/components/ux/Label";
import { UiSlider } from "@/components/ux/Slider";

interface FieldSliderProps extends React.ComponentProps<typeof UiSlider> {
  label?: string;
  helperText?: string;
}

function FieldSlider({
  label,
  helperText,
  className,
  ...props
}: FieldSliderProps) {
  return (
    <div className="space-y-2">
      {label ? <UiLabel>{label}</UiLabel> : null}
      <UiSlider className={className} {...props} />
      {helperText ? (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { FieldSlider };
