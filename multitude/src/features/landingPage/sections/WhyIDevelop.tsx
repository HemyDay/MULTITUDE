import Section from "../Section";

export default function WhyIDevelop() {
  return (
    <Section id="why-i-develop" number={2} title="Pourquoi je développe">
      <div className="flex flex-col gap-4">
        <p>
          Je n’ai pas commencé par développer des outils. J’ai commencé par
          travailler avec les personnes qui pourraient avoir besoin de ces
          outils. Mon parcours dans l’éducation m’a appris à partir des besoins,
          des difficultés et des façons de comprendre de chacun. Aujourd’hui,
          j’essaie d’appliquer la même logique au développement : comprendre
          avant de construire.
        </p>
        <p>
          Ce qui m’intéresse n’est pas seulement de faire fonctionner une
          interface. J’aime réfléchir à la manière dont quelqu’un va la
          comprendre, l’utiliser, se tromper, revenir en arrière ou accomplir sa
          tâche plus facilement. C’est pour cela que je suis particulièrement
          attiré par les outils métiers, les interfaces complexes et les
          produits qui ont un impact concret sur le quotidien de leurs
          utilisateurs.
        </p>
      </div>
    </Section>
  );
}
