import Section from "../Section";

export default function Hero() {
  return (
    <Section id="hero" number={0} title="Hero" noTitle>
      <div className="flex flex-row justify-between border-t-2 border-b-2">
        <div className="uppercase">MONTPELLIER · 2026</div>
        <div className="uppercase">Présentation</div>
      </div>
      <div className="flex flex-col gap-0">
        <div className="text-4xl font-bold">SIRE Amanda</div>
        <div>Développeur front-end</div>
      </div>

      <div className="font-semibold">
        Je construis des outils numériques pensés pour les personnes qui les
        utilisent.
      </div>
      <div className="flex flex-row justify-around border-t-2 border-b-2">
        React · TypeScript · Next.js
      </div>
    </Section>
  );
}
