import * as React from "react";

import { Label as UiLabel } from "@/components/ui/label";

function Label(props: React.ComponentProps<typeof UiLabel>) {
  return <UiLabel {...props} />;
}

export { Label };
