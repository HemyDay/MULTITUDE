import * as React from "react";

import { LightInputOTP } from "@/components/light/InputOTP";

export const InputOTP = React.forwardRef<
  React.ComponentRef<typeof LightInputOTP>,
  React.ComponentPropsWithoutRef<typeof LightInputOTP>
>(function InputOTP(props, ref) {
  return <LightInputOTP ref={ref} {...props} />;
});
InputOTP.displayName = "InputOTP";

export { InputOTP };
