/**
 * Normalize a hex color string to lowercase #rrggbb format.
 * Accepts #rgb, rgb, #rrggbb, and rrggbb; returns null when invalid.
 */
export function normalizeHexColor(value: string): string | null {
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

/**
 * Convert a valid hex color to its RGB channel values.
 * Returns null when the input cannot be normalized as hex.
 */
export function hexToRgb(hex: string) {
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

/**
 * Create a lighter RGB background color from a base hex color.
 * The ratio controls the blend toward white (0 = original, 1 = white).
 */
export function toLightBackground(hex: string, ratio = 0.86) {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    return undefined;
  }

  const blend = (channel: number) =>
    Math.round(channel + (255 - channel) * ratio);

  return `rgb(${blend(rgb.r)} ${blend(rgb.g)} ${blend(rgb.b)})`;
}
