import Section from "../Section";

export default function HowIWork() {
  return (
    <Section id="how-i-work" number={6} title="Ma façon de travailler">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            Comprendre le besoin avant de coder
          </h3>
          <div>
            J’aime savoir à quoi sert une fonctionnalité, qui va l’utiliser et
            quel problème elle doit résoudre avant de commencer
            l’implémentation. Exemple : si un ticket demande d’ajouter un champ
            à un formulaire, je cherche aussi à comprendre dans quel parcours il
            intervient, s’il conditionne d’autres champs et quelles erreurs
            utilisateur peuvent arriver.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            Travailler avec les autres métiers
          </h3>
          <div>
            Je considère que le front-end ne travaille pas isolément. Produit,
            design, backend et QA apportent chacun une partie du contexte
            nécessaire pour construire une bonne solution. Exemple : un échange
            avec la QA peut révéler un cas limite, tandis qu’un échange avec le
            backend peut éviter de contourner inutilement une contrainte d’API.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Clarifier ce qui est ambigu</h3>
          <div>
            Je travaille mieux quand les attentes sont explicites. Si une
            spécification peut être interprétée de plusieurs façons, je préfère
            poser une question plutôt que partir sur une hypothèse fragile.
            Exemple : si une maquette et un ticket ne semblent pas totalement
            alignés, je cherche à faire préciser la règle métier avant de figer
            le comportement dans le code.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Garder le code lisible</h3>
          <div>
            Je préfère une solution simple et compréhensible à une architecture
            compliquée sans bénéfice clair. Mon objectif est que le code puisse
            être relu et modifié facilement plus tard. Exemple : si une logique
            peut rester dans un hook ou un composant clair, je n’essaie pas de
            la découper en plusieurs couches abstraites juste pour “faire plus
            propre”.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Tester les cas limites</h3>
          <div>
            Quand je développe une fonctionnalité, j’essaie de ne pas penser
            uniquement au parcours idéal. Je réfléchis aussi aux erreurs, aux
            états vides et aux comportements inattendus. Exemple : pour un
            formulaire, je pense aux champs manquants, aux valeurs invalides,
            aux erreurs réseau et au retour utilisateur après soumission.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            Privilégier des retours concrets
          </h3>
          <div>
            Je trouve les feedbacks les plus utiles quand ils sont précis,
            contextualisés et exploitables. Ça me permet de comprendre ce qui
            doit changer, mais aussi pourquoi. Exemple : “ce composant devrait
            gérer tel cas limite” m’aide davantage que “ce n’est pas bon”, parce
            que je peux corriger le problème et éviter de le reproduire.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            Chercher à progresser après chaque retour
          </h3>
          <div>
            Quand quelque chose ne fonctionne pas ou qu’un choix est remis en
            question, j’essaie d’en tirer une règle ou un apprentissage
            réutilisable. Exemple : si une PR révèle un problème récurrent de
            validation ou de typage, j’essaie ensuite d’ajuster ma manière de
            faire pour éviter de répéter la même erreur.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            Poser des questions plutôt que supposer
          </h3>
          <div>
            Je préfère demander une précision tôt plutôt que découvrir trop tard
            que j’ai résolu le mauvais problème. Exemple : avant de modifier une
            fonctionnalité existante, je vérifie souvent si le comportement
            actuel est volontaire, hérité d’une contrainte métier ou réellement
            incorrect.
          </div>
        </div>
      </div>
    </Section>
  );
}
