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

const ComboboxAnchorContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null);

function UiCombobox(props: React.ComponentProps<typeof LightCombobox>) {
  const anchorRef = React.useRef<HTMLDivElement>(null);

  return (
    <ComboboxAnchorContext.Provider value={anchorRef}>
      <LightCombobox {...props} />
    </ComboboxAnchorContext.Provider>
  );
}

function UiComboboxContent(
  props: React.ComponentProps<typeof LightComboboxContent>,
) {
  const anchorRef = React.useContext(ComboboxAnchorContext);
  const { anchor, className, ...contentProps } = props;

  return (
    <LightComboboxContent
      anchor={anchor ?? anchorRef ?? undefined}
      className={cn(
        "rounded-[4px] p-1 w-(--anchor-width)! max-w-(--anchor-width)! min-w-(--anchor-width)! box-border",
        className,
      )}
      {...contentProps}
    />
  );
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
  const anchorRef = React.useContext(ComboboxAnchorContext);

  return (
    <div ref={anchorRef} className="w-full min-w-0">
      <LightComboboxInput
        className={cn(
          uxFormStyles.fieldDefault,
          uxFormStyles.wrapperfieldFocus,
          uxFormStyles.fieldPlaceholder,
          uxFormStyles.fieldDisabled,
          "**:data-[slot=input-group-control]:p-0 **:data-[slot=input-group-control]:h-fit",
          "**:data-[slot=input-group-addon]:p-0 **:data-[slot=input-group-button]:p-0",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function UiComboboxItem(props: React.ComponentProps<typeof LightComboboxItem>) {
  return (
    <LightComboboxItem
      className="cursor-pointer hover:bg-accent-foreground rounded-[4px]"
      {...props}
    />
  );
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
