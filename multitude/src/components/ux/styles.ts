export const uxFormStyles = {
  fieldDefault:
    "bg-surface rounded-[4px] flex flex-row gap-2 px-3 py-2 w-full h-fit text-base text-foreground",
  fieldFocus: "focus-visible:border-primary focus-visible:ring-0",
  wrapperfieldFocus:
    "focus-within:border-primary focus-within:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-0",
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
export const FORM_FIELD_WRAPPER_CLASS = "flex flex-col gap-2 w-full h-fit";
