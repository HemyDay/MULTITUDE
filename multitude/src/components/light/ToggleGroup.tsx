import * as React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function LightToggleGroup(props: React.ComponentProps<typeof ToggleGroup>) {
  return <ToggleGroup {...props} />;
}

function LightToggleGroupItem(
  props: React.ComponentProps<typeof ToggleGroupItem>,
) {
  return <ToggleGroupItem {...props} />;
}

export { LightToggleGroup, LightToggleGroupItem };
