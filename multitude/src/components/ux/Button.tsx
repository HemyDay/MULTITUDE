import * as React from "react";
import { cn } from "@/lib/utils";

import { LightButton } from "@/components/light/Button";

function UiButton({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<typeof LightButton>) {
  const variantClassNameByType: Record<
    NonNullable<React.ComponentProps<typeof LightButton>["variant"]>,
    string
  > = {
    default: "",
    outline: "",
    secondary: "",
    ghost: "",
    destructive: "",
    link: "",
  };

  const sizeClassNameByType: Record<
    NonNullable<React.ComponentProps<typeof LightButton>["size"]>,
    string
  > = {
    default:
      "px-4 py-2 gap-4 has-data-[icon=inline-start]:!pl-4 has-data-[icon=inline-end]:!pr-4",
    xs: "px-2 py-1 gap-2 has-data-[icon=inline-start]:!pl-2 has-data-[icon=inline-end]:!pr-2",
    sm: "px-3 py-1.5 gap-3 has-data-[icon=inline-start]:!pl-3 has-data-[icon=inline-end]:!pr-3",
    lg: "px-8 py-4 gap-8 has-data-[icon=inline-start]:!pl-8 has-data-[icon=inline-end]:!pr-8",
    icon: "px-4 py-2",
    "icon-xs": "px-2 py-1",
    "icon-sm": "px-2 py-1",
    "icon-lg": "px-4 py-2",
  };

  return (
    <LightButton
      variant={variant}
      size={size}
      className={cn(
        "cursor-pointer disabled:cursor-auto rounded-[4px] w-fit h-fit",
        variantClassNameByType[variant ?? "default"],
        sizeClassNameByType[size ?? "default"],
        className,
      )}
      {...props}
    />
  );
}

export { UiButton };
