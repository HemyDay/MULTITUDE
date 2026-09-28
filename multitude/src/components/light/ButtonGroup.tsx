import * as React from "react";

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";

function LightButtonGroup({
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroup>) {
  return <ButtonGroup className={className} {...props} />;
}

function LightButtonGroupSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroupSeparator>) {
  return <ButtonGroupSeparator className={className} {...props} />;
}

function LightButtonGroupText({
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroupText>) {
  return <ButtonGroupText className={className} {...props} />;
}

export { LightButtonGroup, LightButtonGroupSeparator, LightButtonGroupText };
