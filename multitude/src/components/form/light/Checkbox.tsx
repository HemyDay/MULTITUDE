import * as React from "react";

import { Checkbox as UiCheckbox } from "@/components/ui/checkbox";

function Checkbox(props: React.ComponentProps<typeof UiCheckbox>) {
  return <UiCheckbox {...props} />;
}

export { Checkbox };
