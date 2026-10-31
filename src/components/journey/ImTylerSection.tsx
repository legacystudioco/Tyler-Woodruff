import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { tylerPortrait } from "@/data/journey/imTyler";

export default function ImTylerSection() {
  return (
    <Section id="about" theme="paper" className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-ink/10">
            <ProjectMedia media={tylerPortrait} label="Tyler Woodruff" sizes="(min-width: 1024px) 36vw, 90vw" />
          </div>
          <p className="mt-5 max-w-md text-balance text-center text-base font-bold italic leading-relaxed text-ink/70">
            In the infamous words of the great Vanilla Ice - If there&rsquo;s a problem, Yo! I&rsquo;ll solve it!
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7 lg:justify-center">
          <Eyebrow tone="ink">About</Eyebrow>
          <p className="text-balance text-lg leading-relaxed text-ink/70 lg:text-xl">
            I&rsquo;m a Creative Technologist based in the Cincinnati–Dayton, Ohio area, working remotely. My
            strength is taking an idea or a real need, recognizing what it could become, and designing and building
            the experience around it—across digital products, websites, desktop and member applications,
            interactive 3D, physical fabrication, video, and live experiences.
          </p>
          <p className="text-balance text-lg leading-relaxed text-ink/70 lg:text-xl">
            I&rsquo;ve never fit neatly into one discipline—software, design, creative direction, live production,
            brand, and product strategy have all been part of the work at different points.
            <span className="text-ink"> Creative Technologist</span> is the closest single title: the ability to
            see the whole system and move between strategy and execution until something works.
          </p>
          <p className="text-balance text-lg leading-relaxed text-ink/70 lg:text-xl">
            Part of that path has run through church leadership—creative direction, original content production,
            technical production, and live-experience design for audiences in the room, not just on a screen.
          </p>
          <DisplayHeading as="h2" size="md" className="mt-2">
            I like figuring out how things could work better&mdash;and then building the solution.
          </DisplayHeading>
        </div>
      </div>
    </Section>
  );
}
