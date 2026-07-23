import * as React from "react";

import { ComboboxList } from "@/components/ui/combobox";

function UiComboboxList(props: React.ComponentProps<typeof ComboboxList>) {
  return <ComboboxList {...props} />;
}

export { UiComboboxList };
