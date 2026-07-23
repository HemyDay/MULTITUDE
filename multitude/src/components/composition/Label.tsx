import * as React from "react";

import { UiLabel } from "@/components/ux/Label";

function Label(props: React.ComponentProps<typeof UiLabel>) {
  return <UiLabel {...props} />;
}

export { Label };
