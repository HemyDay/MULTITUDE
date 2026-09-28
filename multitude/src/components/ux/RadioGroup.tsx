import * as React from "react";

import {
  LightRadioGroup,
  LightRadioGroupItem,
} from "@/components/light/RadioGroup";
import { uxFormStyles } from "./styles";
import { cn } from "@/lib/utils";

function UiRadioGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof LightRadioGroup>) {
  return (
    <LightRadioGroup
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
}: React.ComponentProps<typeof LightRadioGroupItem>) {
  return (
    <LightRadioGroupItem
      className={cn(className, "cursor-pointer disabled:cursor-default")}
      {...props}
    />
  );
}

export { UiRadioGroup, RadioGroupItem };
