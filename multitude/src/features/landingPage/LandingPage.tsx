import Hero from "./sections/Hero";
import MyJourney from "./sections/MyJourney";
import WhyIDevelop from "./sections/WhyIDevelop";
import CurrentProfessionalExperience from "./sections/CurrentProfessionalExperience";
import MySkills from "./sections/MySkills";
import HowIWork from "./sections/HowIWork";
import HowIUseAI from "./sections/HowIUseAI";
import MyMultitudeProject from "./sections/MyMultitudeProject";
import Contact from "./sections/Contact";

export default function LandingPage() {
  return (
    <main className="landing-page gap-16 flex flex-col md:py-28 py-8 max-w-5xl mx-auto px-8">
      <Hero />
      <MyJourney />
      <WhyIDevelop />
      <CurrentProfessionalExperience />
      <MySkills />
      <HowIWork />
      <HowIUseAI />
      <MyMultitudeProject />
      <Contact />
    </main>
  );
}
