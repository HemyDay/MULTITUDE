"use client";

import { useState, type ReactNode } from "react";

import { FieldCheckbox } from "@/components/form/composition/FieldCheckbox";
import { FieldCombobox } from "@/components/form/composition/FieldCombobox";
import { FieldInput } from "@/components/form/composition/FieldInput";
import { FieldInputOTP } from "@/components/form/composition/FieldInputOTP";
import { FieldRadioGroup } from "@/components/form/composition/FieldRadioGroup";
import { FieldSelect } from "@/components/form/composition/FieldSelect";
import { FieldSlider } from "@/components/form/composition/FieldSlider";
import { FieldSwitch } from "@/components/form/composition/FieldSwitch";
import { FieldTextarea } from "@/components/form/composition/FieldTextArea";
import { FieldToggleGroup } from "@/components/form/composition/FieldToggleGroup";
import { Label } from "@/components/form/composition/Label";
import MainLayout from "@/components/layout/MainLayout";

type EditableValue = string | number | boolean;

type FieldDefinition = {
  key: string;
  label: string;
  kind: "text" | "textarea" | "number" | "boolean" | "select";
  helperText?: string;
  options?: Array<{ label: string; value: string }>;
};

type ShowcaseItem = {
  name: string;
  fields: FieldDefinition[];
  initialValues: Record<string, EditableValue>;
  renderPreview: (
    values: Record<string, EditableValue>,
    setValue: (fieldKey: string, nextValue: EditableValue) => void,
  ) => ReactNode;
};

const comboboxOptions = [
  { label: "France", value: "France" },
  { label: "Japan", value: "Japan" },
  { label: "Brazil", value: "Brazil" },
];

const selectOptions = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

const radioOptions = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
  { label: "Lifetime", value: "lifetime" },
];

const nativeSelectOptions = [
  { label: "UTC", value: "utc" },
  { label: "Europe/Paris", value: "europe-paris" },
  { label: "America/New_York", value: "america-new-york" },
];

const toggleOptions = [
  { label: "Bold", value: "bold" },
  { label: "Italic", value: "italic" },
  { label: "Underline", value: "underline" },
];

const compositionComponents: ShowcaseItem[] = [
  {
    name: "FieldCheckbox",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "checked", label: "checked", kind: "boolean" },
      { key: "disabled", label: "disabled", kind: "boolean" },
      { key: "required", label: "required", kind: "boolean" },
      { key: "name", label: "name", kind: "text" },
      { key: "value", label: "value", kind: "text" },
    ],
    initialValues: {
      label: "Email notifications",
      helperText: "Receive updates by email.",
      checked: false,
      disabled: false,
      required: false,
      name: "notifications",
      value: "on",
    },
    renderPreview: (values, setValue) => (
      <FieldCheckbox
        label={String(values.label)}
        helperText={String(values.helperText)}
        checked={Boolean(values.checked)}
        onCheckedChange={(checked) => setValue("checked", checked === true)}
        disabled={Boolean(values.disabled)}
        required={Boolean(values.required)}
        name={String(values.name)}
        value={String(values.value)}
      />
    ),
  },
  {
    name: "FieldCombobox",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "placeholder", label: "placeholder", kind: "text" },
      { key: "showTrigger", label: "showTrigger", kind: "boolean" },
      { key: "showClear", label: "showClear", kind: "boolean" },
      { key: "disabled", label: "disabled", kind: "boolean" },
      { key: "value", label: "value", kind: "text" },
    ],
    initialValues: {
      label: "Country",
      helperText: "Search and select a country.",
      placeholder: "Choose a country",
      showTrigger: true,
      showClear: false,
      disabled: false,
      value: "France",
    },
    renderPreview: (values, setValue) => (
      <FieldCombobox
        label={String(values.label)}
        helperText={String(values.helperText)}
        placeholder={String(values.placeholder)}
        showTrigger={Boolean(values.showTrigger)}
        showClear={Boolean(values.showClear)}
        disabled={Boolean(values.disabled)}
        value={String(values.value)}
        onChange={(event) => setValue("value", event.currentTarget.value)}
        options={comboboxOptions}
      />
    ),
  },
  {
    name: "FieldInput",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "error", label: "error", kind: "text" },
      {
        key: "type",
        label: "type",
        kind: "select",
        options: [
          { label: "text", value: "text" },
          { label: "email", value: "email" },
          { label: "password", value: "password" },
          { label: "number", value: "number" },
        ],
      },
      { key: "value", label: "value", kind: "text" },
      { key: "disabled", label: "disabled", kind: "boolean" },
      { key: "placeholder", label: "placeholder", kind: "text" },
      { key: "name", label: "name", kind: "text" },
    ],
    initialValues: {
      label: "First name",
      helperText: "Use your legal first name.",
      error: "",
      type: "text",
      value: "Ada",
      disabled: false,
      placeholder: "Type a name",
      name: "firstName",
    },
    renderPreview: (values, setValue) => (
      <FieldInput
        label={String(values.label)}
        helperText={String(values.helperText)}
        error={String(values.error)}
        type={String(values.type)}
        value={String(values.value)}
        onChange={(event) => setValue("value", event.currentTarget.value)}
        disabled={Boolean(values.disabled)}
        placeholder={String(values.placeholder)}
        name={String(values.name)}
      />
    ),
  },
  {
    name: "FieldInputOTP",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "maxLength", label: "maxLength", kind: "number" },
      { key: "value", label: "value", kind: "text" },
      { key: "disabled", label: "disabled", kind: "boolean" },
    ],
    initialValues: {
      label: "Verification code",
      helperText: "Enter the 6-digit code.",
      maxLength: 6,
      value: "123456",
      disabled: false,
      className: "",
      containerClassName: "",
    },
    renderPreview: (values, setValue) => {
      const maxLength = Number(values.maxLength);

      return (
        <FieldInputOTP
          label={String(values.label)}
          helperText={String(values.helperText)}
          maxLength={
            Number.isFinite(maxLength) && maxLength > 0 ? maxLength : 6
          }
          value={String(values.value)}
          onChange={(value) => setValue("value", value)}
          disabled={Boolean(values.disabled)}
          className={String(values.className)}
          containerClassName={String(values.containerClassName)}
        />
      );
    },
  },
  {
    name: "FieldRadioGroup",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "value", label: "value", kind: "select", options: radioOptions },
      { key: "disabled", label: "disabled", kind: "boolean" },
      { key: "required", label: "required", kind: "boolean" },
      { key: "name", label: "name", kind: "text" },
      {
        key: "orientation",
        label: "orientation",
        kind: "select",
        options: [
          { label: "vertical", value: "vertical" },
          { label: "horizontal", value: "horizontal" },
        ],
      },
    ],
    initialValues: {
      label: "Plan",
      helperText: "Select one billing plan.",
      value: "monthly",
      disabled: false,
      required: false,
      name: "plan",
      orientation: "vertical",
    },
    renderPreview: (values, setValue) => (
      <FieldRadioGroup
        label={String(values.label)}
        helperText={String(values.helperText)}
        value={String(values.value)}
        onValueChange={(value) => setValue("value", value)}
        disabled={Boolean(values.disabled)}
        required={Boolean(values.required)}
        name={String(values.name)}
        orientation={String(values.orientation) as "vertical" | "horizontal"}
        options={radioOptions}
      />
    ),
  },
  {
    name: "FieldSelect",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "value", label: "value", kind: "select", options: selectOptions },
      { key: "disabled", label: "disabled", kind: "boolean" },
      { key: "required", label: "required", kind: "boolean" },
      { key: "name", label: "name", kind: "text" },
      { key: "open", label: "open", kind: "boolean" },
    ],
    initialValues: {
      label: "Role",
      helperText: "Pick a role from the list.",
      value: "admin",
      disabled: false,
      required: false,
      name: "role",
      open: false,
      className: "",
    },
    renderPreview: (values, setValue) => (
      <FieldSelect
        label={String(values.label)}
        helperText={String(values.helperText)}
        value={String(values.value)}
        onValueChange={(value) => setValue("value", value)}
        disabled={Boolean(values.disabled)}
        required={Boolean(values.required)}
        name={String(values.name)}
        open={Boolean(values.open)}
        onOpenChange={(isOpen) => setValue("open", isOpen)}
        className={String(values.className)}
        options={selectOptions}
        placeholder="Select a role"
      />
    ),
  },
  {
    name: "FieldSlider",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "value", label: "value", kind: "number" },
      { key: "min", label: "min", kind: "number" },
      { key: "max", label: "max", kind: "number" },
      { key: "step", label: "step", kind: "number" },
      { key: "disabled", label: "disabled", kind: "boolean" },
      {
        key: "orientation",
        label: "orientation",
        kind: "select",
        options: [
          { label: "horizontal", value: "horizontal" },
          { label: "vertical", value: "vertical" },
        ],
      },
    ],
    initialValues: {
      label: "Volume",
      helperText: "Adjust the volume level.",
      value: 40,
      min: 0,
      max: 100,
      step: 5,
      disabled: false,
      orientation: "horizontal",
    },
    renderPreview: (values, setValue) => {
      const min = Number(values.min);
      const max = Number(values.max);
      const step = Number(values.step);
      const value = Number(values.value);

      return (
        <FieldSlider
          label={String(values.label)}
          helperText={String(values.helperText)}
          value={[value]}
          onValueChange={(nextValues) =>
            setValue("value", nextValues[0] ?? value)
          }
          min={Number.isFinite(min) ? min : 0}
          max={Number.isFinite(max) ? max : 100}
          step={Number.isFinite(step) ? step : 1}
          disabled={Boolean(values.disabled)}
          orientation={String(values.orientation) as "horizontal" | "vertical"}
        />
      );
    },
  },
  {
    name: "FieldSwitch",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "checked", label: "checked", kind: "boolean" },
      { key: "disabled", label: "disabled", kind: "boolean" },
      { key: "required", label: "required", kind: "boolean" },
      { key: "name", label: "name", kind: "text" },
    ],
    initialValues: {
      label: "Enable feature",
      helperText: "Turn the feature on or off.",
      checked: true,
      disabled: false,
      required: false,
      name: "featureToggle",
    },
    renderPreview: (values, setValue) => (
      <FieldSwitch
        label={String(values.label)}
        helperText={String(values.helperText)}
        checked={Boolean(values.checked)}
        onCheckedChange={(checked) => setValue("checked", checked)}
        disabled={Boolean(values.disabled)}
        required={Boolean(values.required)}
        name={String(values.name)}
      />
    ),
  },
  {
    name: "FieldTextarea",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      { key: "error", label: "error", kind: "text" },
      { key: "value", label: "value", kind: "textarea" },
      { key: "disabled", label: "disabled", kind: "boolean" },
      { key: "placeholder", label: "placeholder", kind: "text" },
      { key: "rows", label: "rows", kind: "number" },
      { key: "cols", label: "cols", kind: "number" },
    ],
    initialValues: {
      label: "Message",
      helperText: "Write a short message.",
      error: "",
      value: "Write something here.",
      disabled: false,
      placeholder: "Type a message",
      rows: 4,
      cols: 32,
    },
    renderPreview: (values, setValue) => (
      <FieldTextarea
        label={String(values.label)}
        helperText={String(values.helperText)}
        error={String(values.error)}
        value={String(values.value)}
        onChange={(event) => setValue("value", event.currentTarget.value)}
        disabled={Boolean(values.disabled)}
        placeholder={String(values.placeholder)}
        rows={Number(values.rows)}
        cols={Number(values.cols)}
      />
    ),
  },
  {
    name: "FieldToggleGroup",
    fields: [
      { key: "label", label: "label", kind: "text" },
      { key: "helperText", label: "helperText", kind: "text" },
      {
        key: "type",
        label: "type",
        kind: "select",
        options: [
          { label: "single", value: "single" },
          { label: "multiple", value: "multiple" },
        ],
      },
      { key: "value", label: "value", kind: "text" },
      { key: "disabled", label: "disabled", kind: "boolean" },
      {
        key: "variant",
        label: "variant",
        kind: "select",
        options: [
          { label: "default", value: "default" },
          { label: "outline", value: "outline" },
        ],
      },
      {
        key: "size",
        label: "size",
        kind: "select",
        options: [
          { label: "default", value: "default" },
          { label: "sm", value: "sm" },
        ],
      },
      {
        key: "orientation",
        label: "orientation",
        kind: "select",
        options: [
          { label: "horizontal", value: "horizontal" },
          { label: "vertical", value: "vertical" },
        ],
      },
    ],
    initialValues: {
      label: "Formatting",
      helperText: "Choose one or more options.",
      type: "multiple",
      value: "bold,italic",
      disabled: false,
      variant: "default",
      size: "default",
      orientation: "horizontal",
      className: "",
    },
    renderPreview: (values, setValue) => {
      const type = String(values.type) as "single" | "multiple";
      const rawValue = String(values.value);
      const commonProps = {
        label: String(values.label),
        helperText: String(values.helperText),
        disabled: Boolean(values.disabled),
        variant: String(values.variant) as "default" | "outline",
        size: String(values.size) as "default" | "sm",
        orientation: String(values.orientation) as "horizontal" | "vertical",
        className: String(values.className),
      };

      if (type === "multiple") {
        const value = rawValue
          .split(",")
          .map((entry) => entry.trim())
          .filter(Boolean);

        return (
          <FieldToggleGroup
            type="multiple"
            value={value}
            onValueChange={(nextValue) =>
              setValue("value", nextValue.join(","))
            }
            options={toggleOptions}
            {...commonProps}
          />
        );
      }

      return (
        <FieldToggleGroup
          type="single"
          value={rawValue}
          onValueChange={(nextValue) => setValue("value", nextValue || "")}
          options={toggleOptions}
          {...commonProps}
        />
      );
    },
  },
  {
    name: "Label",
    fields: [
      { key: "children", label: "children", kind: "text" },
      { key: "htmlFor", label: "htmlFor", kind: "text" },
    ],
    initialValues: {
      children: "Field label",
      htmlFor: "field-label",
      className: "",
    },
    renderPreview: (values) => (
      <Label
        htmlFor={String(values.htmlFor)}
        className={String(values.className)}
      >
        {String(values.children)}
      </Label>
    ),
  },
];

const initialComponentState = compositionComponents.reduce(
  (accumulator, component) => {
    accumulator[component.name] = component.initialValues;
    return accumulator;
  },
  {} as Record<string, Record<string, EditableValue>>,
);

function PropEditorField({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: EditableValue;
  onChange: (nextValue: EditableValue) => void;
}) {
  if (field.kind === "boolean") {
    return (
      <FieldSwitch
        label={field.label}
        helperText={field.helperText}
        checked={Boolean(value)}
        onCheckedChange={(checked) => onChange(checked)}
      />
    );
  }

  if (field.kind === "number") {
    return (
      <FieldInput
        label={field.label}
        helperText={field.helperText}
        type="number"
        value={Number(value)}
        onChange={(event) => {
          const nextValue =
            event.currentTarget.value === ""
              ? 0
              : Number(event.currentTarget.value);
          onChange(Number.isNaN(nextValue) ? 0 : nextValue);
        }}
      />
    );
  }

  if (field.kind === "textarea") {
    return (
      <FieldTextarea
        label={field.label}
        helperText={field.helperText}
        rows={4}
        value={String(value)}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    );
  }

  if (field.kind === "select") {
    return (
      <FieldSelect
        label={field.label}
        helperText={field.helperText}
        value={String(value)}
        onValueChange={(nextValue) => onChange(nextValue)}
        options={field.options ?? []}
      />
    );
  }

  return (
    <FieldInput
      label={field.label}
      helperText={field.helperText}
      type="text"
      value={String(value)}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}

export default function DesignSystemComponentsPage() {
  const [componentState, setComponentState] = useState(initialComponentState);

  function updateField(
    componentName: string,
    fieldKey: string,
    nextValue: EditableValue,
  ) {
    setComponentState((previousState) => ({
      ...previousState,
      [componentName]: {
        ...previousState[componentName],
        [fieldKey]: nextValue,
      },
    }));
  }

  return (
    <MainLayout theme="dark-blue">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-400">
            Form composition
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            Components from components/form/composition
          </h1>
        </div>

        <div className="space-y-8">
          {compositionComponents.map((component) => {
            const values =
              componentState[component.name] ?? component.initialValues;
            const setValue = (fieldKey: string, nextValue: EditableValue) =>
              updateField(component.name, fieldKey, nextValue);

            return (
              <section
                key={component.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur"
              >
                <h1 className="mb-5 text-2xl font-semibold text-foreground">
                  {component.name}
                </h1>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)] lg:items-start">
                  <div className="rounded-[8px] border border-primary p-5">
                    {component.renderPreview(values, setValue)}
                  </div>

                  <aside className="rounded-[8px] border border-primary p-5 flex flex-col gap-4">
                    {component.fields.map((field) => (
                      <PropEditorField
                        key={field.key}
                        field={field}
                        value={values[field.key]}
                        onChange={(nextValue) =>
                          updateField(component.name, field.key, nextValue)
                        }
                      />
                    ))}
                  </aside>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
