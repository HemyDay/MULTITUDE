import * as React from "react";

import {
  LightCombobox,
  LightComboboxContent,
  LightComboboxEmpty,
  LightComboboxInput,
  LightComboboxItem,
  LightComboboxList,
} from "@/components/light/Combobox";
import { uxFormStyles } from "@/components/ux/styles";
import { cn } from "@/lib/utils";

function UiCombobox(props: React.ComponentProps<typeof LightCombobox>) {
  return <LightCombobox {...props} />;
}

function UiComboboxContent(
  props: React.ComponentProps<typeof LightComboboxContent>,
) {
  return <LightComboboxContent {...props} />;
}

function UiComboboxEmpty(
  props: React.ComponentProps<typeof LightComboboxEmpty>,
) {
  return <LightComboboxEmpty {...props} />;
}

function UiComboboxInput({
  className,
  ...props
}: React.ComponentProps<typeof LightComboboxInput>) {
  return (
    <LightComboboxInput
      className={cn(
        uxFormStyles.fieldFocus,
        uxFormStyles.fieldPlaceholder,
        uxFormStyles.fieldDisabled,
        className,
      )}
      {...props}
    />
  );
}

function UiComboboxItem(props: React.ComponentProps<typeof LightComboboxItem>) {
  return <LightComboboxItem {...props} />;
}

function UiComboboxList(props: React.ComponentProps<typeof LightComboboxList>) {
  return <LightComboboxList {...props} />;
}

export {
  UiCombobox,
  UiComboboxContent,
  UiComboboxEmpty,
  UiComboboxInput,
  UiComboboxItem,
  UiComboboxList,
};
