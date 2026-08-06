import * as React from "react";

import {
  LightAvatar,
  LightAvatarBadge,
  LightAvatarFallback,
  LightAvatarGroup,
  LightAvatarGroupCount,
  LightAvatarImage,
} from "@/components/light/Avatar";

interface UiAvatarProps extends React.ComponentProps<typeof LightAvatar> {
  src?: string | null;
  /** Displayed as initials when the image is unavailable */
  name?: string | null;
}

/** Derives up-to-2-letter initials from a full name */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function UiAvatar({ src, name, children, ...props }: UiAvatarProps) {
  return (
    <LightAvatar {...props}>
      {src && <LightAvatarImage src={src} alt={name ?? undefined} />}
      <LightAvatarFallback>
        {name ? getInitials(name) : "?"}
      </LightAvatarFallback>
      {children}
    </LightAvatar>
  );
}

export {
  UiAvatar,
  LightAvatarBadge as UiAvatarBadge,
  LightAvatarGroup as UiAvatarGroup,
  LightAvatarGroupCount as UiAvatarGroupCount,
};
