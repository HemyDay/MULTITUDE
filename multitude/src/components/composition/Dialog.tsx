import * as React from "react";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";

import {
  UiDialog,
  UiDialogContent,
  UiDialogDescription,
  UiDialogFooter,
  UiDialogHeader,
  uxDialogStyles,
  UiDialogTitle,
  UiDialogTrigger,
} from "@/components/ux/Dialog";
import { cn } from "@/lib/utils";

type DialogStyle = "default" | "destructive" | "warning" | "info" | "success";

const dialogIconByVariant: Record<
  Exclude<DialogStyle, "default">,
  React.ComponentType<React.ComponentProps<typeof Info>>
> = {
  info: Info,
  warning: CircleAlert,
  success: CircleCheck,
  destructive: CircleX,
};

interface DialogProps extends React.ComponentPropsWithoutRef<typeof UiDialog> {
  trigger?: React.ReactNode;
  title?: string;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  contentClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;
  showFooterCloseButton?: boolean;
  variantStyle?: DialogStyle;
}

function Dialog({
  trigger,
  title,
  description,
  footer,
  children,
  contentClassName,
  footerClassName,
  showCloseButton = true,
  showFooterCloseButton = false,
  variantStyle = "default",
  ...props
}: DialogProps) {
  const VariantIcon =
    variantStyle !== "default" ? dialogIconByVariant[variantStyle] : undefined;

  return (
    <UiDialog {...props}>
      {trigger ? <UiDialogTrigger asChild>{trigger}</UiDialogTrigger> : null}
      <UiDialogContent
        className={contentClassName}
        showCloseButton={showCloseButton}
      >
        {title || description ? (
          <UiDialogHeader>
            {title ? (
              <UiDialogTitle
                className={cn(
                  uxDialogStyles.titleVariantClassName[variantStyle],
                )}
              >
                <span className={uxDialogStyles.titleWithIcon}>
                  {VariantIcon ? (
                    <VariantIcon className={uxDialogStyles.titleIcon} />
                  ) : null}
                  <span>{title}</span>
                </span>
              </UiDialogTitle>
            ) : null}
            {description ? (
              <UiDialogDescription>{description}</UiDialogDescription>
            ) : null}
          </UiDialogHeader>
        ) : null}
        {children}
        {footer ? (
          <UiDialogFooter
            className={footerClassName}
            showCloseButton={showFooterCloseButton}
          >
            {footer}
          </UiDialogFooter>
        ) : null}
      </UiDialogContent>
    </UiDialog>
  );
}

export { Dialog };
