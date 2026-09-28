import type { Meta, StoryObj } from "@storybook/react";

const componentLinks = [
  { href: "?path=/docs/composition-alert--docs", label: "Alert" },
  { href: "?path=/docs/composition-badge--docs", label: "Badge" },
  { href: "?path=/docs/composition-button--docs", label: "Button" },
  { href: "?path=/docs/composition-button-group--docs", label: "ButtonGroup" },
  { href: "?path=/docs/composition-card--docs", label: "Card" },
  {
    href: "?path=/docs/composition-field-checkbox--docs",
    label: "FieldCheckbox",
  },
  {
    href: "?path=/docs/composition-field-combobox--docs",
    label: "FieldCombobox",
  },
  { href: "?path=/docs/composition-field-input--docs", label: "FieldInput" },
  {
    href: "?path=/docs/composition-field-input-otp--docs",
    label: "FieldInputOTP",
  },
  {
    href: "?path=/docs/composition-field-radio-group--docs",
    label: "FieldRadioGroup",
  },
  { href: "?path=/docs/composition-field-select--docs", label: "FieldSelect" },
  { href: "?path=/docs/composition-field-slider--docs", label: "FieldSlider" },
  { href: "?path=/docs/composition-field-switch--docs", label: "FieldSwitch" },
  {
    href: "?path=/docs/composition-field-textarea--docs",
    label: "FieldTextarea",
  },
  {
    href: "?path=/docs/composition-field-toggle-group--docs",
    label: "FieldToggleGroup",
  },
  { href: "?path=/docs/composition-label--docs", label: "Label" },
];

const meta = {
  title: "Documentation/Intro",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Explore each composition component with prop tables, controls and style/theme variants.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Multitude Component Library</h1>
        <p className="text-sm text-muted-foreground">
          Lucid-inspired docs experience with structured pages, controls and
          visual variants.
        </p>
      </header>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="mb-3 text-base font-semibold">How to use</h2>
        <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
          <li>Open Docs tab to inspect auto-generated props table.</li>
          <li>Use Canvas controls to test variants and states.</li>
          <li>Use the paintbrush toolbar to switch global project theme.</li>
        </ul>
      </section>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="mb-3 text-base font-semibold">Components</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {componentLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md border px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  ),
};
