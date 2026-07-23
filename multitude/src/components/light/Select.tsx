import * as React from "react";

import { Select } from "@/components/ui/select";

function LightSelect(props: React.ComponentProps<typeof Select>) {
  return <Select {...props} />;
}

export { LightSelect };
