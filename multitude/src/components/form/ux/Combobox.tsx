import * as React from "react";

import { Combobox } from "@/components/form/light/Combobox";

function UiCombobox(props: React.ComponentProps<typeof Combobox>) {
  return <Combobox {...props} />;
}

export { UiCombobox };
