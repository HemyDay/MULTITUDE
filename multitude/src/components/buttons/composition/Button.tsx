import * as React from "react";

import { UiButton } from "@/components/buttons/ux/Button/Button";

function Button({
  className,
  ...props
}: React.ComponentProps<typeof UiButton>) {
  return <UiButton className={className} {...props} />;
}

export { Button };
