import {
  Calendar1,
  DiamondPlus,
  FileText,
  LayoutDashboard,
  Map,
  SquareKanban,
  Table2,
} from "lucide-react";
import Section from "../Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const projects = [
  {
    value: "dashboard",
    title: "Dashboard | Suivi de la vie étudiante",
    Icon: LayoutDashboard,
    description: (
      <>
        <p>
          Destiné aux <strong>étudiants</strong>, ce tableau de bord centralise
          les informations importantes de leur quotidien universitaire : cours,
          échéances, résultats et événements à venir. Il répond au besoin
          d’avoir une <strong>vue d’ensemble claire et rapide</strong> depuis
          une seule interface.
        </p>
        <p>
          <strong>Compétences mises en pratique :</strong> responsive design,
          composants réutilisables, data visualisation, graphiques, gestion des
          états de chargement, consommation d’API et organisation d’une
          interface riche en informations.
        </p>
      </>
    ),
  },
  {
    value: "calendar",
    title: "Calendrier | Gestion d’un salon de beauté",
    Icon: Calendar1,
    description: (
      <>
        <p>
          Destiné aux <strong>professionnels d’un salon de beauté</strong>, ce
          calendrier permet d’organiser les rendez-vous selon les prestations,
          leur durée et les disponibilités de chaque employé. Il facilite la
          planification quotidienne et permet d’
          <strong>éviter les conflits de réservation</strong>.
        </p>
        <p>
          <strong>Compétences mises en pratique :</strong> manipulation de dates
          et horaires, calendrier interactif, drag &amp; drop, événements
          récurrents, détection de conflits, responsive design et gestion d’état
          complexe.
        </p>
      </>
    ),
  },
  {
    value: "form",
    title: "Formulaire | Organisation d’événements",
    Icon: FileText,
    description: (
      <>
        <p>
          Destiné aux <strong>collaborateurs d’une entreprise</strong>, ce
          formulaire accompagne la création d’un événement en adaptant les
          informations demandées à chaque situation : réunion, formation,
          conférence, entretien ou événement interne. Il permet de{" "}
          <strong>
            centraliser les informations nécessaires tout en guidant
            l’utilisateur et en limitant les erreurs
          </strong>
          .
        </p>
        <p>
          <strong>Compétences mises en pratique :</strong> formulaire
          multi-étapes, validation avec Zod, React Hook Form, champs
          conditionnels, sélection multiple, upload de fichiers, gestion des
          erreurs, sauvegarde de brouillon et responsive design.
        </p>
      </>
    ),
  },
  {
    value: "data-table",
    title: "Data Table | Recherche d’offres d’emploi",
    Icon: Table2,
    description: (
      <>
        <p>
          Destinée aux <strong>personnes à la recherche d’un emploi</strong>,
          cette interface facilite l’exploration d’un grand nombre d’offres
          grâce à la recherche, aux filtres, au tri et à la pagination. Elle
          permet de{" "}
          <strong>
            trouver rapidement les opportunités correspondant à ses critères
          </strong>
          .
        </p>
        <p>
          <strong>Compétences mises en pratique :</strong> TanStack Table,
          recherche, tri, pagination, filtres avancés, sélection de colonnes,
          URL Search Params, manipulation de données, appels API et adaptation
          mobile d’un tableau complexe.
        </p>
      </>
    ),
  },
  {
    value: "map",
    title: "Carte | Recherche de ressources d’urgence",
    Icon: Map,
    description: (
      <>
        <p>
          Destinée au <strong>grand public</strong>, cette carte permet de
          localiser les ressources utiles les plus proches, comme les
          défibrillateurs, casernes de pompiers ou établissements de santé. Elle
          répond au besoin d’
          <strong>
            identifier rapidement une ressource à proximité en fonction de sa
            position
          </strong>
          .
        </p>
        <p>
          <strong>Compétences mises en pratique :</strong> carte interactive,
          géolocalisation, géocodage d’adresses, API externes, GeoJSON,
          marqueurs et clusters, filtres géographiques, calcul de distances et
          affichage responsive.
        </p>
      </>
    ),
  },
  {
    value: "kanban",
    title: "Kanban | Suivi du développement",
    Icon: SquareKanban,
    description: (
      <>
        <p>
          Destiné aux <strong>équipes de développement logiciel</strong>, ce
          Kanban permet de suivre les tâches depuis leur création jusqu’à leur
          livraison, en passant par le développement, la revue et les tests. Il
          permet à l’équipe de{" "}
          <strong>
            visualiser immédiatement l’avancement du travail et les tâches
            nécessitant son attention
          </strong>
          .
        </p>
        <p>
          <strong>Compétences mises en pratique :</strong> drag &amp; drop avec{" "}
          <code>dnd-kit</code>, gestion d’état complexe, réorganisation
          d’éléments, optimistic updates, filtres, formulaires, persistance des
          données, composants interactifs et responsive design.
        </p>
      </>
    ),
  },
  {
    value: "diagram-maker",
    title: "Diagram Maker | Modélisation de processus",
    Icon: DiamondPlus,
    description: (
      <>
        <p>
          Destiné aux{" "}
          <strong>développeurs, analystes et équipes produit</strong>, cet
          éditeur permet de construire des diagrammes d’activité UML afin de
          représenter visuellement le fonctionnement d’un processus ou d’une
          fonctionnalité. Il permet de{" "}
          <strong>
            rendre une logique métier complexe plus facile à comprendre,
            modifier et partager
          </strong>
          .
        </p>
        <p>
          <strong>Compétences mises en pratique :</strong> React Flow (
          <code>@xyflow/react</code>), drag &amp; drop, graphes et relations,
          nœuds personnalisés, zoom et déplacement du canvas, gestion de
          coordonnées, undo/redo, sérialisation JSON, sauvegarde et
          import/export.
        </p>
      </>
    ),
  },
];

export default function MyMultitudeProject() {
  return (
    <Section id="my-multitude-project" number={7} title="Mon projet MULTITUDE">
      <div className="flex flex-col gap-4">
        <p>
          <strong>Multitude</strong> est un projet personnel que je développe
          sur mon temps libre pour enrichir mon portfolio, expérimenter et
          continuer à apprendre.
        </p>
        <p>
          Mon expérience professionnelle s’étant jusqu’ici principalement
          construite autour d’un même produit, je souhaitais pouvoir présenter
          plus largement mes compétences sans exposer le code ou les projets de
          mon entreprise. Multitude me permet ainsi d’explorer une grande
          diversité de problématiques front-end à travers plusieurs interfaces,
          chacune pensée pour répondre à{" "}
          <strong>un besoin concret et à un public spécifique</strong>.
        </p>
        <p>
          Chaque projet est conçu comme une véritable expérience utilisateur :{" "}
          <strong>
            responsive lorsque le contexte s’y prête, accessible et attentive
            aux détails d’UX
          </strong>
          , avec une attention particulière portée aux différents états de
          l’interface, aux erreurs, aux chargements, aux interactions et aux
          feedbacks utilisateur.
        </p>
        <p>
          L’ensemble repose sur un{" "}
          <strong>design system commun, robuste et réutilisable</strong>. Les
          mêmes composants sont utilisés à travers les différents projets et
          s’adaptent à leur univers, notamment grâce à une couleur principale
          propre à chacun. L’objectif est de construire un système cohérent,
          mais suffisamment flexible pour fonctionner dans des contextes et des
          usages très différents.
        </p>
        <p>
          C’est également un{" "}
          <strong>terrain d’expérimentation et d’apprentissage</strong> : chaque
          nouvelle interface est l’occasion de travailler des problématiques,
          des outils ou des concepts différents et de sortir de ce que je
          rencontre habituellement dans mon environnement professionnel.
        </p>
        <p>
          Enfin, Multitude est un projet volontairement évolutif. Je suis{" "}
          <strong>
            ouverte aux suggestions de développeurs expérimentés, de recruteurs
            ou de professionnels du produit
          </strong>
          : nouveaux types d’interfaces, problématiques intéressantes à résoudre
          ou compétences particulièrement pertinentes à démontrer. L’objectif
          est de continuer à enrichir le projet avec des cas d’usage variés qui
          me permettent de progresser tout en donnant une vision plus complète
          de mes compétences.
        </p>
      </div>

      <div className="flex items-center gap-4 text-center my-4 text-sm uppercase">
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        <span>Projets en cours de création</span>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <Accordion type="multiple" className="gap-8">
        {projects.map(({ value, title, Icon, description }) => (
          <AccordionItem
            key={value}
            value={value}
            className="not-last:border-b-0"
          >
            <AccordionTrigger className="flex-row items-center rounded-none border-0 p-0 text-xl font-semibold hover:no-underline">
              <span className="flex flex-row items-center gap-3">
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 -translate-y-0.5"
                />
                <span className="leading-none">{title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="h-auto pt-4 pb-0 text-base">
              {description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
