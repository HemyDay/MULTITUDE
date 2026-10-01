import Section from "../Section";

export default function HowIUseAI() {
  return (
    <Section id="how-i-use-ai" number={6} title="Comment j’utilise l’IA">
      <div className="flex flex-col gap-4">
        <p>
          J’utilise l’IA comme un outil de réflexion, d’organisation et
          d’accélération, pas comme un substitut à la compréhension du code.
        </p>
        <p>
          Dans le développement, elle m’aide à explorer plusieurs approches
          avant d’implémenter une solution, à débloquer une recherche technique,
          à mieux comprendre une API ou une librairie, à identifier des cas
          limites ou à enrichir mes scénarios de tests.
        </p>
        <p>
          Je m’en sers aussi pour mieux structurer mon travail : découper une
          fonctionnalité en tâches plus petites, clarifier un plan d’action,
          prioriser ce que j’ai à faire ou reformuler un besoin lorsque celui-ci
          est encore flou.
        </p>
        <p>
          Enfin, je l’utilise comme aide à la rédaction pour mettre en forme
          certains contenus professionnels, par exemple des emails, des comptes
          rendus ou des explications techniques, tout en gardant le fond, le ton
          et la validation finale de mon côté.
        </p>
        <p>
          Je ne cherche pas à intégrer du code ou à envoyer un contenu que je ne
          comprends pas. Je vérifie les propositions, je les adapte au contexte
          et je garde la responsabilité de ce qui est finalement produit.
        </p>
        <p>
          Pour moi, l’IA fait partie de la boîte à outils du développeur, au
          même titre que la documentation, les tests, les recherches techniques
          ou les échanges avec l’équipe.
        </p>
      </div>
    </Section>
  );
}
