import * as React from "react";

import { LightBadge } from "@/components/light/Badge";
import { cn } from "@/lib/utils";
import { normalizeHexColor, toLightBackground } from "@/lib/colors";

interface UiBadgeProps extends React.ComponentProps<typeof LightBadge> {
  colorHex?: string;
}

function UiBadge({ className, colorHex, style, ...props }: UiBadgeProps) {
  const normalizedColorHex =
    typeof colorHex === "string" ? normalizeHexColor(colorHex) : null;

  const customStyle = normalizedColorHex
    ? {
        color: normalizedColorHex,
        backgroundColor: toLightBackground(normalizedColorHex),
        borderColor: "transparent",
      }
    : undefined;

  return (
    <LightBadge
      className={cn(className, "select-none, rounded-[4px]")}
      style={{ ...style, ...customStyle }}
      {...props}
    />
  );
}

export { UiBadge };
