import * as React from "react";

import { Card as UiCard } from "@/components/ui/card";

function Card({ className, ...props }: React.ComponentProps<typeof UiCard>) {
  return <UiCard className={className} {...props} />;
}

export { Card };
