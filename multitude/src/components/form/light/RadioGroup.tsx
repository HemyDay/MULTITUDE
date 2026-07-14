import * as React from "react";

import { RadioGroup as UiRadioGroup } from "@/components/ui/radio-group";

function RadioGroup(props: React.ComponentProps<typeof UiRadioGroup>) {
  return <UiRadioGroup {...props} />;
}

export { RadioGroup };
