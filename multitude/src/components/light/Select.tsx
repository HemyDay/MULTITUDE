import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function LightSelect(props: React.ComponentProps<typeof Select>) {
  return <Select {...props} />;
}

function LightSelectTrigger(props: React.ComponentProps<typeof SelectTrigger>) {
  return <SelectTrigger {...props} />;
}

function LightSelectValue(props: React.ComponentProps<typeof SelectValue>) {
  return <SelectValue {...props} />;
}

function LightSelectContent(props: React.ComponentProps<typeof SelectContent>) {
  return <SelectContent {...props} />;
}

function LightSelectItem(props: React.ComponentProps<typeof SelectItem>) {
  return <SelectItem {...props} />;
}

export {
  LightSelect,
  LightSelectContent,
  LightSelectItem,
  LightSelectTrigger,
  LightSelectValue,
};
