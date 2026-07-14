import * as React from "react";

import { Select } from "@/components/form/light/Select";

function UiSelect(props: React.ComponentProps<typeof Select>) {
  return <Select {...props} />;
}

export { UiSelect };
