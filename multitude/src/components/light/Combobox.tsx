import * as React from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

function LightCombobox(props: React.ComponentProps<typeof Combobox>) {
  return <Combobox {...props} />;
}

function LightComboboxContent(
  props: React.ComponentProps<typeof ComboboxContent>,
) {
  return <ComboboxContent {...props} />;
}

function LightComboboxEmpty(props: React.ComponentProps<typeof ComboboxEmpty>) {
  return <ComboboxEmpty {...props} />;
}

function LightComboboxInput(props: React.ComponentProps<typeof ComboboxInput>) {
  return <ComboboxInput {...props} />;
}

function LightComboboxItem(props: React.ComponentProps<typeof ComboboxItem>) {
  return <ComboboxItem {...props} />;
}

function LightComboboxList(props: React.ComponentProps<typeof ComboboxList>) {
  return <ComboboxList {...props} />;
}

export {
  LightCombobox,
  LightComboboxContent,
  LightComboboxEmpty,
  LightComboboxInput,
  LightComboboxItem,
  LightComboboxList,
};
