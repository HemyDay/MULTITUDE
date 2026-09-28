import * as React from "react";

import { Switch } from "@/components/ui/switch";

function LightSwitch(props: React.ComponentProps<typeof Switch>) {
  return <Switch {...props} />;
}

export { LightSwitch };
