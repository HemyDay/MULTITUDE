import * as React from "react";

import { LightSlider } from "@/components/light/Slider";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiSlider({
  className,
  ...props
}: React.ComponentProps<typeof LightSlider>) {
  return (
    <LightSlider
      className={cn(
        uxFormStyles.fieldFocus,
        uxFormStyles.fieldDisabled,
        className,
      )}
      {...props}
    />
  );
}

export { UiSlider };
