import Hero from "./sections/Hero";
import MyJourney from "./sections/MyJourney";
import WhyIDevelop from "./sections/WhyIDevelop";
import CurrentProfessionalExperience from "./sections/CurrentProfessionalExperience";
import MySkills from "./sections/MySkills";
import HowIWork from "./sections/HowIWork";
import HowIUseAI from "./sections/HowIUseAI";
import MyMultitudeProject from "./sections/MyMultitudeProject";
import Contact from "./sections/Contact";
import BackToTopButton from "./BackToTopButton";

const navigationSections = [
  { id: "my-journey", title: "Mon parcours" },
  { id: "why-i-develop", title: "Pourquoi je développe" },
  {
    id: "current-professional-experience",
    title: "Mon expérience professionnelle actuelle",
  },
  { id: "my-skills", title: "Ce que je sais faire" },
  { id: "how-i-work", title: "Ma façon de travailler" },
  { id: "how-i-use-ai", title: "Comment j’utilise l’IA" },
  { id: "my-multitude-project", title: "Mon projet MULTITUDE" },
  { id: "contact", title: "Et si on échangeait ?" },
];

export default function LandingPage() {
  return (
    <main
      lang="fr"
      className="landing-page gap-16 flex flex-col md:py-28 py-8 max-w-5xl mx-auto px-8"
    >
      <Hero />
      <nav aria-labelledby="landing-page-toc-title" className="border-y py-6">
        <h2
          id="landing-page-toc-title"
          className="mb-4 text-2xl font-bold text-center"
        >
          Sommaire
        </h2>
        <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {navigationSections.map(({ id, title }, index) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="group flex items-baseline gap-3 py-1 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <span className="text-sm tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="underline-offset-4 group-hover:underline">
                  {title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <MyJourney />
      <WhyIDevelop />
      <CurrentProfessionalExperience />
      <MySkills />
      <HowIWork />
      <HowIUseAI />
      <MyMultitudeProject />
      <Contact />
      <BackToTopButton />
    </main>
  );
}
