import * as React from "react";

import {
  ToggleGroup as UiToggleGroup,
  ToggleGroupItem as UiToggleGroupItem,
} from "@/components/ui/toggle-group";

function ToggleGroup(props: React.ComponentProps<typeof UiToggleGroup>) {
  return <UiToggleGroup {...props} />;
}

function ToggleGroupItem(
  props: React.ComponentProps<typeof UiToggleGroupItem>,
) {
  return <UiToggleGroupItem {...props} />;
}

export { ToggleGroup, ToggleGroupItem };
