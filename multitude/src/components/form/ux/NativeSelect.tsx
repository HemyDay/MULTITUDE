import * as React from "react";

import { NativeSelect } from "@/components/form/light/NativeSelect";

function UiNativeSelect({
  className,
  ...props
}: React.ComponentProps<typeof NativeSelect>) {
  return <NativeSelect className={className} {...props} />;
}

export { UiNativeSelect };
