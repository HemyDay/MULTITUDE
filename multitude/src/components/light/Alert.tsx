import * as React from "react";

import {
  Alert,
  AlertTitle,
  AlertAction,
  AlertDescription,
} from "@/components/ui/alert";

function LightAlert({
  className,
  ...props
}: React.ComponentProps<typeof Alert>) {
  return <Alert className={className} {...props} />;
}

function LightAlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertTitle>) {
  return <AlertTitle className={className} {...props} />;
}

function LightAlertAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertAction>) {
  return <AlertAction className={className} {...props} />;
}

function LightAlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDescription>) {
  return <AlertDescription className={className} {...props} />;
}

export { LightAlert, LightAlertTitle, LightAlertAction, LightAlertDescription };
