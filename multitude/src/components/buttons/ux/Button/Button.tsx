import * as React from "react";

import { Button } from "@/components/buttons/light/Button/Button";

function UiButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button className={className} {...props} />;
}

export { UiButton };
