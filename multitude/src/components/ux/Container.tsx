import * as React from "react";

import { LightCard } from "@/components/light/Card";
import { cn } from "@/lib/utils";

function UiContainer({
  className,
  ...props
}: React.ComponentProps<typeof LightCard>) {
  return (
    <LightCard
      className={cn(
        "flex flex-col items-center gap-8 p-8 rounded-[8px] border-none ring-0 bg-surface w-full h-fit",
        className,
      )}
      {...props}
    />
  );
}

export { UiContainer };
