import Hero from "@/components/hero/Hero";
import ApproachSection from "@/components/intro/ApproachSection";
import SectionTransition from "@/components/intro/SectionTransition";
import SelectedWork from "@/components/work/SelectedWork";
import CaseStudySection from "@/components/case-studies/CaseStudySection";
import CaseStudyDivider from "@/components/case-studies/shared/CaseStudyDivider";
import LifeChangeSection from "@/components/creative/LifeChangeSection";
import VisualExperimentsSection from "@/components/creative/VisualExperimentsSection";
import LabSection from "@/components/creative/LabSection";
import HowIWorkSection from "@/components/journey/HowIWorkSection";
import BeyondOneBoxSection from "@/components/journey/BeyondOneBoxSection";
import CapabilitiesSection from "@/components/journey/CapabilitiesSection";
import AiMaterialSection from "@/components/journey/AiMaterialSection";
import MessyMiddleSection from "@/components/journey/MessyMiddleSection";
import ImTylerSection from "@/components/journey/ImTylerSection";
import ExperienceSection from "@/components/journey/ExperienceSection";
import ThingsIBelieveSection from "@/components/journey/ThingsIBelieveSection";
import LookingForSection from "@/components/journey/LookingForSection";
import ContactSection from "@/components/journey/ContactSection";
import { projects } from "@/data/projects";

const eliteProject = projects.find((p) => p.id === "elite-home-sources")!;
const sportsProject = projects.find((p) => p.id === "3d-sports-displays")!;
const ministryProject = projects.find((p) => p.id === "ministry-linker")!;
const lifeChangeProject = projects.find((p) => p.id === "life-change")!;
const visualWorkProject = projects.find((p) => p.id === "visual-work")!;
const labProject = projects.find((p) => p.id === "lab")!;

export default function Home() {
  return (
    <main>
      <Hero />
      <ApproachSection />
      <SectionTransition />
      <SelectedWork />

      <CaseStudyDivider fromTheme="paper" toTheme="ink" number={eliteProject.number} label={eliteProject.title} accent={eliteProject.accent ?? "signal"} />
      <CaseStudySection project={eliteProject} />

      <CaseStudyDivider fromTheme="ink" toTheme="ink" number={sportsProject.number} label={sportsProject.title} accent={sportsProject.accent ?? "heat"} />
      <CaseStudySection project={sportsProject} />

      <CaseStudyDivider fromTheme="ink" toTheme="ink" number={ministryProject.number} label={ministryProject.title} accent={ministryProject.accent ?? "electric"} />
      <CaseStudySection project={ministryProject} />

      <CaseStudyDivider
        fromTheme="ink"
        toTheme="ink"
        number={lifeChangeProject.number}
        label={lifeChangeProject.title}
        accent={lifeChangeProject.accent ?? "heat"}
        variant="bleed"
      />
      <LifeChangeSection />

      <CaseStudyDivider
        fromTheme="ink"
        toTheme="paper"
        number={visualWorkProject.number}
        label={visualWorkProject.title}
        accent={visualWorkProject.accent ?? "signal"}
      />
      <VisualExperimentsSection />

      <CaseStudyDivider
        fromTheme="paper"
        toTheme="ink"
        number={labProject.number}
        label={labProject.title}
        accent={labProject.accent ?? "electric"}
        variant="marquee"
      />
      <LabSection />

      <CaseStudyDivider fromTheme="ink" toTheme="paper" number="07" label="How I Work" accent="signal" />
      <HowIWorkSection />

      <BeyondOneBoxSection />
      <CapabilitiesSection />
      <AiMaterialSection />

      <CaseStudyDivider fromTheme="ink" toTheme="ink" number="—" label="The Messy Middle" accent="electric" variant="bleed" />
      <MessyMiddleSection />

      <ImTylerSection />
      <ExperienceSection />
      <ThingsIBelieveSection />
      <LookingForSection />
      <ContactSection />
    </main>
  );
}
