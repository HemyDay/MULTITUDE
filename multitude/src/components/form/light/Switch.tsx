import * as React from "react";

import { Switch as UiSwitch } from "@/components/ui/switch";

function Switch(props: React.ComponentProps<typeof UiSwitch>) {
  return <UiSwitch {...props} />;
}

export { Switch };
