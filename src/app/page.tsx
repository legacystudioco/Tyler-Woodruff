import Hero from "@/components/hero/Hero";
import ApproachSection from "@/components/intro/ApproachSection";
import SectionTransition from "@/components/intro/SectionTransition";
import SelectedWork from "@/components/work/SelectedWork";
import CaseStudySection from "@/components/case-studies/CaseStudySection";
import CaseStudyDivider from "@/components/case-studies/shared/CaseStudyDivider";
import CapabilitiesSection from "@/components/journey/CapabilitiesSection";
import ImTylerSection from "@/components/journey/ImTylerSection";
import ExperienceSection from "@/components/journey/ExperienceSection";
import ContactSection from "@/components/journey/ContactSection";
import { projects } from "@/data/projects";

const kingdomProject = projects.find((p) => p.id === "kingdom-conference")!;
const sportsProject = projects.find((p) => p.id === "3d-sports-displays")!;
const hiVibeProject = projects.find((p) => p.id === "hi-vibe")!;
const eliteProject = projects.find((p) => p.id === "elite-home-sources")!;
const ministryProject = projects.find((p) => p.id === "ministry-linker")!;
const riverProject = projects.find((p) => p.id === "river-of-life")!;

export default function Home() {
  return (
    <main>
      <Hero />
      <ApproachSection />
      <SectionTransition />
      <SelectedWork />

      <CaseStudyDivider fromTheme="paper" toTheme="ink" number={kingdomProject.number} label={kingdomProject.title} accent={kingdomProject.accent ?? "heat"} />
      <CaseStudySection project={kingdomProject} />

      <CaseStudyDivider fromTheme="ink" toTheme="ink" number={sportsProject.number} label={sportsProject.title} accent={sportsProject.accent ?? "electric"} />
      <CaseStudySection project={sportsProject} />

      <CaseStudyDivider fromTheme="ink" toTheme="ink" number={hiVibeProject.number} label={hiVibeProject.title} accent={hiVibeProject.accent ?? "signal"} />
      <CaseStudySection project={hiVibeProject} />

      <CaseStudyDivider fromTheme="ink" toTheme="ink" number={ministryProject.number} label={ministryProject.title} accent={ministryProject.accent ?? "electric"} />
      <CaseStudySection project={ministryProject} />

      <CaseStudyDivider fromTheme="ink" toTheme="ink" number={eliteProject.number} label={eliteProject.title} accent={eliteProject.accent ?? "signal"} />
      <CaseStudySection project={eliteProject} />

      <CaseStudyDivider fromTheme="ink" toTheme="ink" number={riverProject.number} label={riverProject.title} accent={riverProject.accent ?? "heat"} />
      <CaseStudySection project={riverProject} />

      <CaseStudyDivider fromTheme="ink" toTheme="paper" number="—" label="About & Experience" accent="signal" />

      <ImTylerSection />
      <ExperienceSection />
      <CapabilitiesSection />
      <ContactSection />
    </main>
  );
}
