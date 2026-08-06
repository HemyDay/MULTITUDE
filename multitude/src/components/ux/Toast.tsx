import * as React from "react";

import { LightToast } from "@/components/light/Toast";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  AlertCircle,
  CircleX,
  LoaderCircle,
  CircleCheck,
} from "lucide-react";

interface UiToastProps extends React.ComponentProps<typeof LightToast> {
  variant?: "success" | "warning" | "info" | "destructive" | "loading";
  showIcon?: boolean;
}

const variantConfig = {
  success: {
    icon: CircleCheck,
    iconColor: "text-success",
  },
  warning: {
    icon: AlertCircle,
    iconColor: "text-warning",
  },
  info: {
    icon: AlertCircle,
    iconColor: "text-info",
  },
  destructive: {
    icon: CircleX,
    iconColor: "text-destructive",
  },
  loading: {
    icon: LoaderCircle,
    iconColor: "text-primary animate-spin",
  },
};

function UiToast({
  className,
  variant = "info",
  showIcon = true,
  title,
  description,
  action,
  children,
  ...props
}: UiToastProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-[4px] bg-surface p-4 border-gray-300 shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex gap-3 items-start">
        {showIcon && (
          <Icon className={cn("size-5 shrink-0 mt-0.5", config.iconColor)} />
        )}
        <div className="flex-1">
          {title && <div className="font-semibold text-sm">{title}</div>}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export { UiToast };
