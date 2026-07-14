import * as React from "react";

import { Switch } from "@/components/form/light/Switch";

function UiSwitch({
  className,
  ...props
}: React.ComponentProps<typeof Switch>) {
  return <Switch className={className} {...props} />;
}

export { UiSwitch };
