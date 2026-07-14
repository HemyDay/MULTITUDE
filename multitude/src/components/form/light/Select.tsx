import * as React from "react";

import { Select as UiSelect } from "@/components/ui/select";

function Select(props: React.ComponentProps<typeof UiSelect>) {
  return <UiSelect {...props} />;
}

export { Select };
