import * as React from "react";

import { ComboboxItem } from "@/components/ui/combobox";

function UiComboboxItem(props: React.ComponentProps<typeof ComboboxItem>) {
  return <ComboboxItem {...props} />;
}

export { UiComboboxItem };
