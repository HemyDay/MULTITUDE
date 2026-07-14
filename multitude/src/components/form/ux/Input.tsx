import * as React from "react";

import { Input } from "@/components/form/light/Input";

function UiInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input className={className} {...props} />;
}

export { UiInput };
