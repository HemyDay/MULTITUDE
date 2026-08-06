import * as React from "react";

import {
  UiAvatar,
  UiAvatarBadge,
  UiAvatarGroup,
  UiAvatarGroupCount,
} from "@/components/ux/Avatar";

function Avatar({ ...props }: React.ComponentProps<typeof UiAvatar>) {
  return <UiAvatar {...props} />;
}

function AvatarBadge({ ...props }: React.ComponentProps<typeof UiAvatarBadge>) {
  return <UiAvatarBadge {...props} />;
}

function AvatarGroup({ ...props }: React.ComponentProps<typeof UiAvatarGroup>) {
  return <UiAvatarGroup {...props} />;
}

function AvatarGroupCount({
  ...props
}: React.ComponentProps<typeof UiAvatarGroupCount>) {
  return <UiAvatarGroupCount {...props} />;
}

export { Avatar, AvatarBadge, AvatarGroup, AvatarGroupCount };
