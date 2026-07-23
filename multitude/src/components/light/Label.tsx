import * as React from "react";

import { Label } from "@/components/ui/label";

function LightLabel(props: React.ComponentProps<typeof Label>) {
  return <Label {...props} />;
}

export { LightLabel };
