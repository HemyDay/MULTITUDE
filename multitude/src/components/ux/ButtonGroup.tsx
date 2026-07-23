import * as React from "react";

import {
  LightButtonGroup,
  LightButtonGroupText,
  LightButtonGroupSeparator,
} from "@/components/light/ButtonGroup";
import { cn } from "@/lib/utils";

function UiButtonGroup({
  className,
  ...props
}: React.ComponentProps<typeof LightButtonGroup>) {
  return <LightButtonGroup className={className} {...props} />;
}

function UiButtonGroupText({
  className,
  ...props
}: React.ComponentProps<typeof LightButtonGroupText>) {
  return (
    <LightButtonGroupText
      className={cn(
        className,
        "px-4 py-2 gap-4 rounded-[4px] w-fit h-fit border-none select-none",
      )}
      {...props}
    />
  );
}

function UiButtonGroupSeparator({
  className,
  ...props
}: React.ComponentProps<typeof LightButtonGroupSeparator>) {
  return <LightButtonGroupSeparator className={className} {...props} />;
}

export { UiButtonGroup, UiButtonGroupText, UiButtonGroupSeparator };
