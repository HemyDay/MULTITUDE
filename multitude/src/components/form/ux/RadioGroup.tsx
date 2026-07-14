import * as React from "react";

import { RadioGroup } from "@/components/form/light/RadioGroup";

function UiRadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroup>) {
  return <RadioGroup className={className} {...props} />;
}

export { UiRadioGroup };
