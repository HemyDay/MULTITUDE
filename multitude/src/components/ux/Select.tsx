import * as React from "react";

import {
  LightSelect,
  LightSelectContent,
  LightSelectItem,
  LightSelectTrigger,
  LightSelectValue,
} from "@/components/light/Select";
import { uxFormStyles } from "@/components/ux/styles";
import { cn } from "@/lib/utils";

function UiSelect(props: React.ComponentProps<typeof LightSelect>) {
  return <LightSelect {...props} />;
}

function UiSelectTrigger({
  className,
  ...props
}: React.ComponentProps<typeof LightSelectTrigger>) {
  return (
    <LightSelectTrigger
      className={cn(
        uxFormStyles.fieldDefault,
        uxFormStyles.fieldFocus,
        uxFormStyles.fieldPlaceholder,
        uxFormStyles.fieldDisabled,
        className,
      )}
      {...props}
    />
  );
}

function UiSelectValue(props: React.ComponentProps<typeof LightSelectValue>) {
  return <LightSelectValue {...props} />;
}

function UiSelectContent(
  props: React.ComponentProps<typeof LightSelectContent>,
) {
  return <LightSelectContent {...props} />;
}

function UiSelectItem(props: React.ComponentProps<typeof LightSelectItem>) {
  return <LightSelectItem {...props} />;
}

export {
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
  UiSelectValue,
};
