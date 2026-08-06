import * as React from "react";

import { LightBadge } from "@/components/light/Badge";
import { cn } from "@/lib/utils";

interface UiBadgeProps extends React.ComponentProps<typeof LightBadge> {
  colorHex?: string;
}

function normalizeHexColor(value: string): string | null {
  const sanitized = value.trim().replace(/^#/, "");

  if (/^[0-9a-fA-F]{3}$/.test(sanitized)) {
    const [r, g, b] = sanitized;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  if (/^[0-9a-fA-F]{6}$/.test(sanitized)) {
    return `#${sanitized}`.toLowerCase();
  }

  return null;
}

function hexToRgb(hex: string) {
  const normalized = normalizeHexColor(hex);

  if (!normalized) {
    return null;
  }

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  };
}

function toLightBackground(hex: string, ratio = 0.86) {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    return undefined;
  }

  const blend = (channel: number) =>
    Math.round(channel + (255 - channel) * ratio);

  return `rgb(${blend(rgb.r)} ${blend(rgb.g)} ${blend(rgb.b)})`;
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
      className={cn(className, "select-none")}
      style={{ ...style, ...customStyle }}
      {...props}
    />
  );
}

export { UiBadge };
