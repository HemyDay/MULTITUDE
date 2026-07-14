import * as React from "react";

import { Combobox as UiCombobox } from "@/components/ui/combobox";

function Combobox(props: React.ComponentProps<typeof UiCombobox>) {
  return <UiCombobox {...props} />;
}

export { Combobox };
