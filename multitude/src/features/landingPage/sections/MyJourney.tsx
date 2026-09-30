import Section from "../Section";

export default function MyJourney() {
  return (
    <Section id="my-journey" number={2} title="Mon parcours">
      <div className="flex flex-col gap-4">
        <p>
          Mon parcours a d’abord été tourné vers l’éducation et
          l’accompagnement. J’ai travaillé dans l’animation périscolaire, comme
          AESH, surveillante en collège, en garde d’enfants et en aide aux
          devoirs, tout en suivant une Licence de Sciences du Langage (Parcours
          communication, médias et médiation numérique) puis une première année
          de Master MEEF Professeur des écoles.
        </p>
        <p>
          J’ai ensuite choisi de me reconvertir dans le développement web et
          obtenu en 2024 un titre professionnel de développeur web et web
          mobile. Peu après, un hackathon organisé avec France Travail m’a
          permis de rencontrer l’entreprise qui m’a recrutée et de commencer mon
          parcours professionnel dans le développement front-end.
        </p>
      </div>
    </Section>
  );
}
