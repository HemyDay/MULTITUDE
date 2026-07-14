import * as React from "react";

import { Textarea } from "@/components/form/light/Textarea";

function UiTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return <Textarea className={className} {...props} />;
}

export { UiTextarea };
