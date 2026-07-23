import * as React from "react";

import { LightSelect } from "@/components/light/Select";

function UiSelect(props: React.ComponentProps<typeof LightSelect>) {
  return <LightSelect {...props} />;
}

export { UiSelect };
