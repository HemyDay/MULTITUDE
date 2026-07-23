import * as React from "react";

import {
  LightToggleGroup,
  LightToggleGroupItem,
} from "@/components/light/ToggleGroup";
import { cn } from "@/lib/utils";
import { uxFormStyles } from "./styles";

function UiToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof LightToggleGroup>) {
  return (
    <LightToggleGroup
      className={cn(
        uxFormStyles.controlFocus,
        uxFormStyles.controlDisabled,
        className,
      )}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof LightToggleGroupItem>) {
  return (
    <LightToggleGroupItem
      className={cn(className, "cursor-pointer disabled:cursor-default")}
      {...props}
    />
  );
}

export { UiToggleGroup, ToggleGroupItem };
