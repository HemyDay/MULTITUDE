export const uxFormStyles = {
  fieldDefault:
    "rounded-[4px] flex flex-row gap-2 px-2 py-1 w-full h-fit text-base text-foreground",
  fieldFocus: "",
  fieldPlaceholder: "",
  fieldDisabled: "disabled:bg-gray-300 disabled:border-gray-300",
  controlFocus: "",
  controlDisabled: "",
  labelDisabled: "text-gray-400",
} as const;

export const FORM_FIELD_LABEL_CLASS =
  "text-sm font-medium p-0 flex flex-row gap-2";
export const FORM_FIELD_HELPER_CLASS = "text-sm text-muted-foreground";
export const FORM_FIELD_ERROR_CLASS = "text-sm text-destructive";
