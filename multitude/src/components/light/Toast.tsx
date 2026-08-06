import * as React from "react";

interface LightToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function LightToast({
  className,
  title,
  description,
  action,
  children,
  ...props
}: LightToastProps) {
  return (
    <div className={className} {...props}>
      <div className="flex gap-3 items-start">
        <div className="flex-1">
          {title && <div className="font-semibold text-sm">{title}</div>}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  );
}

export { LightToast };
