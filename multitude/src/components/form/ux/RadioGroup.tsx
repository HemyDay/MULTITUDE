import * as React from "react";

import { RadioGroup } from "@/components/form/light/RadioGroup";
import { RadioGroupItem as UiRadioGroupItem } from "@/components/ui/radio-group";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiRadioGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup
      orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "flex flex-row flex-wrap"
          : "flex flex-col",
        uxFormStyles.controlFocus,
        uxFormStyles.controlDisabled,
        className,
      )}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof UiRadioGroupItem>) {
  return (
    <UiRadioGroupItem
      className={cn(className, "cursor-pointer disabled:cursor-default")}
      {...props}
    />
  );
}

export { UiRadioGroup, RadioGroupItem };
