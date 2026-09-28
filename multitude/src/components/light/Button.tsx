import * as React from "react";

import { Button } from "@/components/ui/button";

function LightButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button className={className} {...props} />;
}

export { LightButton };
