import * as React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function LightRadioGroup(props: React.ComponentProps<typeof RadioGroup>) {
  return <RadioGroup {...props} />;
}

function LightRadioGroupItem(
  props: React.ComponentProps<typeof RadioGroupItem>,
) {
  return <RadioGroupItem {...props} />;
}

export { LightRadioGroup, LightRadioGroupItem };
