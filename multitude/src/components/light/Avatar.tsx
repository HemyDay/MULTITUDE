import * as React from "react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

function LightAvatar({
  className,
  ...props
}: React.ComponentProps<typeof Avatar>) {
  return <Avatar className={className} {...props} />;
}

function LightAvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarImage>) {
  return <AvatarImage className={className} {...props} />;
}

function LightAvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarFallback>) {
  return <AvatarFallback className={className} {...props} />;
}

function LightAvatarBadge({
  className,
  ...props
}: React.ComponentProps<typeof AvatarBadge>) {
  return <AvatarBadge className={className} {...props} />;
}

function LightAvatarGroup({
  className,
  ...props
}: React.ComponentProps<typeof AvatarGroup>) {
  return <AvatarGroup className={className} {...props} />;
}

function LightAvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<typeof AvatarGroupCount>) {
  return <AvatarGroupCount className={className} {...props} />;
}

export {
  LightAvatar,
  LightAvatarImage,
  LightAvatarFallback,
  LightAvatarBadge,
  LightAvatarGroup,
  LightAvatarGroupCount,
};
