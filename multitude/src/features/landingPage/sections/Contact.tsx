import { Mail, Phone } from "lucide-react";
import Section from "../Section";
import { Button } from "@/components/composition/Button";

const email = "sire.amanda@gmail.com";
const phone = "+33667786704";

const contactLinks = [
  {
    href: "https://fr.linkedin.com/in/asiredev",
    label: "LinkedIn",
    icon: "linkedin",
    external: true,
  },
  {
    href: `mailto:${email}`,
    label: email,
    icon: "mail",
  },
  {
    href: `tel:${phone}`,
    label: "06 67 78 67 04",
    icon: "phone",
  },
];

export default function Contact() {
  return (
    <Section id="contact" number={8} title="Et si on échangeait ?">
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-2">
          <p>Mon profil vous intéresse ? Vous aimeriez me faire un retour ?</p>
          <p>
            Qu’est-ce qu’il vous manquerait pour m’imaginer intégrer votre
            entreprise ? Qu’aimeriez-vous savoir sur un futur candidat ?
          </p>
          <p>
            Lequel des projets MULTITUDE vous intrigue le plus ? Lequel vous
            semble le plus utile ?
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {contactLinks.map(({ href, label, icon, external }) => (
            <div key={label} className="w-full">
              <Button
                asChild
                variant="outline"
                className="h-auto w-full justify-start gap-4 rounded-none py-4 text-left"
              >
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {icon === "linkedin" ? (
                    <span
                      aria-hidden="true"
                      className="flex size-6 shrink-0 items-center justify-center text-xl font-bold text-[#0A66C2]"
                    >
                      in
                    </span>
                  ) : icon === "mail" ? (
                    <Mail aria-hidden="true" className="size-6" />
                  ) : (
                    <Phone aria-hidden="true" className="size-6" />
                  )}
                  <span className="min-w-0 break-all">{label}</span>
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
