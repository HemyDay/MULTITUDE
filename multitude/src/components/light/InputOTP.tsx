import * as React from "react";

import { InputOTP } from "@/components/ui/input-otp";

function LightInputOTP(props: React.ComponentProps<typeof InputOTP>) {
  return <InputOTP {...props} />;
}

export { LightInputOTP };
