import * as React from "react";

import { LightCard } from "@/components/light/Card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

function UiContainer({
  className,
  ...props
}: React.ComponentProps<typeof LightCard>) {
  const isMobile = useIsMobile();
  return (
    <LightCard
      className={cn(
        "flex flex-col items-center gap-8 p-8 rounded-[8px] border-none ring-0 bg-surface w-full h-fit",
        isMobile && "p-4",
        className,
      )}
      {...props}
    />
  );
}

export { UiContainer };
