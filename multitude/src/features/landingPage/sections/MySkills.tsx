import Section from "../Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MySkills() {
  return (
    <Section id="my-skills" number={4} title="Ce que je sais faire">
      <Accordion type="multiple" className="gap-8">
        <AccordionItem
          value="complex-business-flows"
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Construire des parcours métier complexes
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je développe des interfaces qui doivent gérer de nombreuses règles
            métier et plusieurs cas de figure : prise de rendez-vous,
            calendriers, cartes, gestion des dates ou encore des adresses.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="complex-forms" className="not-last:border-b-0">
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Créer des formulaires complexes
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je suis à l’aise avec les formulaires comportant des champs
            conditionnels, des validations, différents états et des messages
            d’erreur adaptés.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="integrate-apis" className="not-last:border-b-0">
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Intégrer des API et manipuler des données
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je consomme des API pour récupérer, afficher et envoyer des données
            dans les interfaces. J’ai également travaillé sur l’intégration de
            services externes, notamment autour de la téléconsultation avec une
            API RTC.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="maintain-products"
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Faire évoluer et maintenir un produit existant
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je sais reprendre une base de code existante, comprendre son
            fonctionnement, faire du debug, corriger des bugs et faire évoluer
            des fonctionnalités déjà en production.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="reusable-components"
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Créer des composants réutilisables
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je travaille sur des composants communs et des éléments de design
            system afin de garder une interface cohérente et maintenable :
            modales, alertes, toasts, composants de formulaire ou éléments de
            navigation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="interface-quality"
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Veiller à la qualité de l’interface
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je prends en compte le responsive, l’accessibilité, les cas limites
            et les différents états d’une interface. J’écris également des tests
            pour sécuriser les comportements et les évolutions du produit.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
}
