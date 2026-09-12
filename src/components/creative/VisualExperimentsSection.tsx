import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import GalleryTile from "./shared/GalleryTile";
import { galleryItems } from "@/data/creative/visualExperiments";

export default function VisualExperimentsSection() {
  return (
    <Section id="visual-work" theme="paper" className="py-28 lg:py-36">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 px-6 lg:px-12">
        <SectionHeader
          theme="paper"
          eyebrow="08 — Visual Experiments & Identity"
          heading="Visual Experiments & Identity"
          supporting={"“Sometimes the solution isn’t a platform. Sometimes it’s an image, identity, environment, or moment.”"}
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-12 lg:gap-5">
          {galleryItems.map((item) => (
            <GalleryTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
