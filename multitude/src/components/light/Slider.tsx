import * as React from "react";

import { Slider } from "@/components/ui/slider";

function LightSlider(props: React.ComponentProps<typeof Slider>) {
  return <Slider {...props} />;
}

export { LightSlider };
