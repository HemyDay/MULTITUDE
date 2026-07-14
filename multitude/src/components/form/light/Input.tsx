import * as React from "react";

import { Input as UiInput } from "@/components/ui/input";

function Input(props: React.ComponentProps<typeof UiInput>) {
  return <UiInput {...props} />;
}

export { Input };
