import Section from "../Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HowIWork() {
  return (
    <Section id="how-i-work" number={5} title="Ma façon de travailler">
      <Accordion type="multiple" className="gap-8">
        <AccordionItem
          value="understand-the-need"
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Comprendre le besoin avant de coder
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            J’aime savoir à quoi sert une fonctionnalité, qui va l’utiliser et
            quel problème elle doit résoudre avant de commencer
            l’implémentation. Exemple : si un ticket demande d’ajouter un champ
            à un formulaire, je cherche aussi à comprendre dans quel parcours il
            intervient, s’il conditionne d’autres champs et quelles erreurs
            utilisateur peuvent arriver.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="collaborate" className="not-last:border-b-0">
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Travailler avec les autres métiers
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je considère que le front-end ne travaille pas isolément. Produit,
            design, backend et QA apportent chacun une partie du contexte
            nécessaire pour construire une bonne solution. Exemple : un échange
            avec la QA peut révéler un cas limite, tandis qu’un échange avec le
            backend peut éviter de contourner inutilement une contrainte d’API.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="clarify-ambiguity"
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Clarifier ce qui est ambigu
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je travaille mieux quand les attentes sont explicites. Si une
            spécification peut être interprétée de plusieurs façons, je préfère
            poser une question plutôt que partir sur une hypothèse fragile.
            Exemple : si une maquette et un ticket ne semblent pas totalement
            alignés, je cherche à faire préciser la règle métier avant de figer
            le comportement dans le code.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="readable-code" className="not-last:border-b-0">
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Garder le code lisible
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je préfère une solution simple et compréhensible à une architecture
            compliquée sans bénéfice clair. Mon objectif est que le code puisse
            être relu et modifié facilement plus tard. Exemple : si une logique
            peut rester dans un hook ou un composant clair, je n’essaie pas de
            la découper en plusieurs couches abstraites juste pour “faire plus
            propre”.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="edge-cases" className="not-last:border-b-0">
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Tester les cas limites
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Quand je développe une fonctionnalité, j’essaie de ne pas penser
            uniquement au parcours idéal. Je réfléchis aussi aux erreurs, aux
            états vides et aux comportements inattendus. Exemple : pour un
            formulaire, je pense aux champs manquants, aux valeurs invalides,
            aux erreurs réseau et au retour utilisateur après soumission.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="concrete-feedback"
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Privilégier des retours concrets
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je trouve les feedbacks les plus utiles quand ils sont précis,
            contextualisés et exploitables. Ça me permet de comprendre ce qui
            doit changer, mais aussi pourquoi. Exemple : “ce composant devrait
            gérer tel cas limite” m’aide davantage que “ce n’est pas bon”, parce
            que je peux corriger le problème et éviter de le reproduire.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="learn-from-feedback"
          className="not-last:border-b-0"
        >
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Chercher à progresser après chaque retour
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Quand quelque chose ne fonctionne pas ou qu’un choix est remis en
            question, j’essaie d’en tirer une règle ou un apprentissage
            réutilisable. Exemple : si une PR révèle un problème récurrent de
            validation ou de typage, j’essaie ensuite d’ajuster ma manière de
            faire pour éviter de répéter la même erreur.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ask-questions" className="not-last:border-b-0">
          <AccordionTrigger className="items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
            Poser des questions plutôt que supposer
          </AccordionTrigger>
          <AccordionContent className="h-auto pt-4 pb-0 text-base">
            Je préfère demander une précision tôt plutôt que découvrir trop tard
            que j’ai résolu le mauvais problème. Exemple : avant de modifier une
            fonctionnalité existante, je vérifie souvent si le comportement
            actuel est volontaire, hérité d’une contrainte métier ou réellement
            incorrect.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
}
