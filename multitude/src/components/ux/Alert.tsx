import * as React from "react";

import {
  LightAlert,
  LightAlertTitle,
  LightAlertAction,
  LightAlertDescription,
} from "@/components/light/Alert";

function UiAlert({
  className,
  ...props
}: React.ComponentProps<typeof LightAlert>) {
  return <LightAlert className={className} {...props} />;
}

function UiAlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof LightAlertTitle>) {
  return <LightAlertTitle className={className} {...props} />;
}

function UiAlertAction({
  className,
  ...props
}: React.ComponentProps<typeof LightAlertAction>) {
  return <LightAlertAction className={className} {...props} />;
}

function UiAlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof LightAlertDescription>) {
  return <LightAlertDescription className={className} {...props} />;
}

export { UiAlert, UiAlertTitle, UiAlertAction, UiAlertDescription };
