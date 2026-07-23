import * as React from "react";

import { Textarea } from "@/components/ui/textarea";

function LightTextarea(props: React.ComponentProps<typeof Textarea>) {
  return <Textarea {...props} />;
}

export { LightTextarea };
