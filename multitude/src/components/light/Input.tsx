import * as React from "react";

import { Input } from "@/components/ui/input";

function LightInput(props: React.ComponentProps<typeof Input>) {
  return <Input {...props} />;
}

export { LightInput };
