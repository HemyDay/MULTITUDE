import * as React from "react";

import { ButtonGroupText } from "@/components/buttons/light/Button/ButtonGroupText";
import { cn } from "@/lib/utils";

function UiButtonGroupText({
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroupText>) {
  return (
    <ButtonGroupText
      className={cn(
        className,
        "px-4 py-2 gap-4 rounded-[4px] w-fit h-fit border-none",
      )}
      {...props}
    />
  );
}

export { UiButtonGroupText };
