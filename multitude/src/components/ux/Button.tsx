import * as React from "react";
import { cn } from "@/lib/utils";

import { LightButton } from "@/components/light/Button";

type LightButtonProps = React.ComponentProps<typeof LightButton>;
type BaseVariant = NonNullable<LightButtonProps["variant"]>;
type UiVariant = BaseVariant | "info" | "warning" | "success";

interface UiButtonProps extends Omit<LightButtonProps, "variant"> {
  variant?: UiVariant;
}

function UiButton({ variant, size, className, ...props }: UiButtonProps) {
  const variantClassNameByType: Record<UiVariant, string> = {
    default: "",
    outline: "",
    secondary: "",
    ghost: "",
    info: "bg-info/10 text-info hover:bg-info/20 focus-visible:border-info/40 focus-visible:ring-info/20 dark:bg-info/20 dark:hover:bg-info/30 dark:focus-visible:ring-info/40",
    warning:
      "bg-warning/10 text-warning hover:bg-warning/20 focus-visible:border-warning/40 focus-visible:ring-warning/20 dark:bg-warning/20 dark:hover:bg-warning/30 dark:focus-visible:ring-warning/40",
    success:
      "bg-success/10 text-success hover:bg-success/20 focus-visible:border-success/40 focus-visible:ring-success/20 dark:bg-success/20 dark:hover:bg-success/30 dark:focus-visible:ring-success/40",
    destructive:
      "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
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

  const resolvedVariant: BaseVariant =
    variant === "info" || variant === "warning" || variant === "success"
      ? "default"
      : (variant ?? "default");

  return (
    <LightButton
      variant={resolvedVariant}
      size={size}
      className={cn(
        "cursor-pointer disabled:cursor-auto rounded-lg w-fit h-fit",
        variantClassNameByType[variant ?? "default"],
        sizeClassNameByType[size ?? "default"],
        className,
      )}
      {...props}
    />
  );
}

export { UiButton };
