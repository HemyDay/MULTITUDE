import * as React from "react";

import { Card } from "@/components/display/light/Card/Card";

function UiCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return <Card className={className} {...props} />;
}

export { UiCard };
