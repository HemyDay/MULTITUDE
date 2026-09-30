import Section from "../Section";

export default function CurrentProfessionalExperience() {
  return (
    <Section
      id="current-professional-experience"
      number={3}
      title="Mon expérience professionnelle actuelle"
    >
      <div className="flex flex-col gap-4">
        <p>
          Depuis novembre 2023, je travaille comme développeuse front-end chez
          WEDA, où j’ai rejoint l’équipe une semaine avant la mise en production
          de Zena, une plateforme de prise de rendez-vous médicaux en ligne. Je
          contribue également à Zena Pro, l’interface utilisée par les
          praticiens pour gérer leur profil, leurs rendez-vous et leurs
          patients.
        </p>
        <p>
          Au fil de l’évolution de ces produits, j’ai travaillé sur de
          nombreuses parties de l’expérience : parcours de prise de rendez-vous,
          calendrier, formulaires, carte, landing pages, composants du design
          system ou encore emails envoyés aux utilisateurs. J’ai notamment
          beaucoup travaillé sur le parcours de prise de rendez-vous, qui
          comporte de nombreuses branches et règles métier selon le type de
          consultation ou les modalités du rendez-vous, ainsi que sur les
          éléments de feedback de l’interface comme les alertes, les toasts et
          les fenêtres de confirmation.
        </p>
        <p>
          Travailler sur des produits de santé m’a également permis de mieux
          comprendre les enjeux liés aux données sensibles, à leur sécurisation
          et à leur traitement dans un cadre soumis au RGPD et au secret
          professionnel. Cette expérience m’a appris à prendre en compte ces
          contraintes dans la conception des fonctionnalités, les échanges de
          données et les informations transmises aux utilisateurs.
        </p>
        <p>
          Je travaille au sein d’une équipe à taille humaine réunissant
          développeurs front-end et back-end, produit et UX. Nous fonctionnons
          en sprints d’une semaine, rythmés par un daily quotidien, dans un
          environnement réactif où l’information circule rapidement, où les
          choix sont régulièrement discutés et challengés, et où il faut savoir
          s’adapter aux évolutions du produit et aux besoins qui émergent.
        </p>
      </div>
    </Section>
  );
}
