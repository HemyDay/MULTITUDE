import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";

function LightCheckbox(props: React.ComponentProps<typeof Checkbox>) {
  return <Checkbox {...props} />;
}

export { LightCheckbox };
