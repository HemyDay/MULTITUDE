import * as React from "react";

import { UiButton } from "@/components/buttons/ux/Button/Button";
import { UiButtonGroupSeparator } from "@/components/buttons/ux/Button/ButtonGroupSeparator";
import { UiButtonGroupText } from "@/components/buttons/ux/Button/ButtonGroupText";
import { UiButtonGroup } from "@/components/buttons/ux/Button/ButtonGroup";

type ButtonGroupItem = {
  label: React.ReactNode;
  type: "button" | "text";
  action?: React.ComponentProps<typeof UiButton>["onClick"];
  variant?: React.ComponentProps<typeof UiButton>["variant"];
};

interface ButtonGroupProps extends React.ComponentPropsWithoutRef<
  typeof UiButtonGroup
> {
  items: ButtonGroupItem[];
}

function ButtonGroup({
  items,
  className,
  orientation,
  ...props
}: ButtonGroupProps) {
  const separatorOrientation =
    orientation === "vertical" ? "horizontal" : "vertical";

  return (
    <UiButtonGroup className={className} orientation={orientation} {...props}>
      {items.flatMap((item, index) => {
        const key = `${index}-${String(item.label)}`;

        const renderedItem =
          item.type === "text" ? (
            <UiButtonGroupText key={key}>{item.label}</UiButtonGroupText>
          ) : (
            <UiButton
              key={key}
              variant={item.variant ?? "default"}
              onClick={item.action}
            >
              {item.label}
            </UiButton>
          );

        if (index === items.length - 1) {
          return [renderedItem];
        }

        return [
          renderedItem,
          <UiButtonGroupSeparator
            key={`${key}-separator`}
            orientation={separatorOrientation}
          />,
        ];
      })}
    </UiButtonGroup>
  );
}

export { ButtonGroup };
export type { ButtonGroupItem, ButtonGroupProps };
