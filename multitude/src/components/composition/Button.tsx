import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { UiButton } from "@/components/ux/Button";

interface ButtonProps extends React.ComponentProps<typeof UiButton> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

function Button({
  startIcon: StartIcon,
  endIcon: EndIcon,
  children,
  className,
  asChild,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <UiButton asChild className={className} {...props}>
        {children}
      </UiButton>
    );
  }

  return (
    <UiButton className={className} {...props}>
      {StartIcon ? <StartIcon data-icon="inline-start" /> : null}
      {children}
      {EndIcon ? <EndIcon data-icon="inline-end" /> : null}
    </UiButton>
  );
}

export { Button };
