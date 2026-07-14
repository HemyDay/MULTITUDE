import * as React from "react";

import { NativeSelect as UiNativeSelect } from "@/components/ui/native-select";

function NativeSelect(props: React.ComponentProps<typeof UiNativeSelect>) {
  return <UiNativeSelect {...props} />;
}

export { NativeSelect };
