import * as React from "react";

import { Label } from "@/components/form/light/Label";

function UiLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={className} {...props} />;
}

export { UiLabel };
