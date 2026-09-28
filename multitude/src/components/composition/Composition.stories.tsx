import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Check, ArrowRight } from "lucide-react";

import { Alert } from "@/components/composition/Alert";
import { Badge } from "@/components/composition/Badge";
import { Button } from "@/components/composition/Button";
import {
  ButtonGroup,
  type ButtonGroupItem,
} from "@/components/composition/ButtonGroup";
import { Card } from "@/components/composition/Card";
import { Container } from "@/components/composition/Container";
import { Dialog } from "@/components/composition/Dialog";
import { FieldCheckbox } from "@/components/composition/FieldCheckbox";
import { FieldCombobox } from "@/components/composition/FieldCombobox";
import { FieldInput } from "@/components/composition/FieldInput";
import { FieldInputOTP } from "@/components/composition/FieldInputOTP";
import { FieldRadioGroup } from "@/components/composition/FieldRadioGroup";
import { FieldSelect } from "@/components/composition/FieldSelect";
import { FieldSlider } from "@/components/composition/FieldSlider";
import { FieldSwitch } from "@/components/composition/FieldSwitch";
import { FieldTextarea } from "@/components/composition/FieldTextArea";
import { FieldToggleGroup } from "@/components/composition/FieldToggleGroup";
import { Label } from "@/components/composition/Label";

const meta = {
  title: "Composition/Showcase",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const buttonGroupItems: ButtonGroupItem[] = [
  { label: "Backlog", type: "text" },
  { label: "Approve", type: "button", variant: "default" },
  { label: "Reject", type: "button", variant: "secondary" },
];

const options = [
  { label: "Alpha", value: "alpha" },
  { label: "Bravo", value: "bravo" },
  { label: "Charlie", value: "charlie", disabled: true },
];

function ShowcasePanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-4">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function CompositionShowcase() {
  const [selectValue, setSelectValue] = React.useState("alpha");
  const [radioValue, setRadioValue] = React.useState("alpha");

  return (
    <main className="min-h-screen bg-linear-to-b from-background to-muted/20 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">Composition Components</h1>
          <p className="text-sm text-muted-foreground">
            Story de visualisation pour les composants de
            src/components/composition.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ShowcasePanel title="Alert">
            <Alert
              title="Deploy complete"
              description="La derniere version est en ligne."
              action={<Button size="sm">Voir</Button>}
            />
          </ShowcasePanel>

          <ShowcasePanel title="Badge + Label">
            <div className="space-y-3">
              <Badge>New</Badge>
              <div className="space-x-3">
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <Label>Label de reference</Label>
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Button + ButtonGroup">
            <div className="space-y-4">
              <Button startIcon={Check} endIcon={ArrowRight}>
                Confirmer
              </Button>
              <ButtonGroup items={buttonGroupItems} />
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Card">
            <Card
              title="Plan Pro"
              description="Acces complet a toutes les fonctionnalites"
              footer={<Button size="sm">Continuer</Button>}
            >
              <p className="text-sm text-muted-foreground">
                Cette carte montre la structure composee: header, content et
                footer.
              </p>
            </Card>
          </ShowcasePanel>

          <ShowcasePanel title="Container">
            <Container
              title="Section projet"
              description="Bloc de contenu avec action contextuelle"
              action={
                <Button size="sm" variant="outline">
                  Modifier
                </Button>
              }
            >
              <p className="text-sm text-muted-foreground">
                Utilisez Container pour encadrer une section reusable avec
                titre, description et action.
              </p>
            </Container>
          </ShowcasePanel>

          <ShowcasePanel title="Dialog">
            <Dialog
              title="Publier les changements"
              description="Confirmez la publication de cette version pour tous les utilisateurs."
              trigger={<Button size="sm">Ouvrir</Button>}
              footer={<Button size="sm">Publier</Button>}
            >
              <p className="text-sm text-muted-foreground">
                Vous pouvez utiliser ce composant pour les confirmations,
                formulaires rapides ou details contextuels.
              </p>
            </Dialog>
          </ShowcasePanel>

          <ShowcasePanel title="Input Fields">
            <div className="space-y-4">
              <FieldInput
                label="Nom complet"
                placeholder="Ex: Lea Martin"
                helperText="Ce champ est obligatoire"
              />
              <FieldTextarea
                label="Description"
                placeholder="Ajoutez une note"
                helperText="Maximum 280 caracteres"
              />
              <FieldInputOTP
                label="Code OTP"
                helperText="6 chiffres"
                maxLength={6}
              />
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Selection Fields">
            <div className="space-y-4">
              <FieldCheckbox
                label="Recevoir la newsletter"
                helperText="1 email par semaine"
                defaultChecked
              />
              <FieldSwitch
                label="Activer les notifications"
                helperText="Push instantane"
                defaultChecked
              />
              <FieldSlider
                label="Volume"
                helperText="Niveau sonore"
                defaultValue={[45]}
                max={100}
                step={1}
              />
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Choice Groups">
            <div className="space-y-4">
              <FieldRadioGroup
                label="Priorite"
                value={radioValue}
                onValueChange={setRadioValue}
                options={options}
              />
              <FieldToggleGroup
                label="Periode"
                type="single"
                defaultValue="alpha"
                options={options}
              />
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Combobox + Select">
            <div className="space-y-4">
              <FieldCombobox
                label="Projet"
                placeholder="Rechercher..."
                helperText="Choisissez un projet"
                options={options}
              />
              <FieldSelect
                label="Equipe"
                value={selectValue}
                onValueChange={setSelectValue}
                options={options}
                placeholder="Selectionner une equipe"
                helperText="Option Charlie desactivee"
              />
            </div>
          </ShowcasePanel>
        </div>
      </div>
    </main>
  );
}

export const AllComponents: Story = {
  render: () => <CompositionShowcase />,
};
