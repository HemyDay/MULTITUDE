import * as React from "react";

import { ComboboxContent } from "@/components/ui/combobox";

function UiComboboxContent(
  props: React.ComponentProps<typeof ComboboxContent>,
) {
  return <ComboboxContent {...props} />;
}

export { UiComboboxContent };
