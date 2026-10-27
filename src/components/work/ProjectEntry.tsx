import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import ProjectMedia from "@/components/ui/ProjectMedia";
import Tag from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

const layoutClasses: Record<Project["layout"], string> = {
  large: "lg:col-span-8 lg:row-span-2 lg:min-h-[700px]",
  tall: "lg:col-span-4 lg:row-span-2 lg:min-h-[620px]",
  wide: "lg:col-span-8",
  standard: "lg:col-span-7",
  feature: "lg:col-span-5",
};

const mediaHeightClasses: Record<Project["layout"], string> = {
  large: "min-h-[360px] sm:min-h-[440px] lg:min-h-[480px]",
  tall: "min-h-[420px] lg:min-h-[440px]",
  wide: "min-h-[300px] sm:min-h-[360px]",
  standard: "min-h-[280px] sm:min-h-[320px]",
  feature: "min-h-[280px]",
};

const titleClasses: Record<Project["layout"], string> = {
  large: "text-3xl sm:text-4xl lg:text-[2.75rem]",
  tall: "text-2xl sm:text-3xl",
  wide: "text-2xl sm:text-3xl lg:text-4xl",
  standard: "text-2xl sm:text-3xl",
  feature: "text-2xl sm:text-3xl",
};

const accentText: Record<NonNullable<Project["accent"]>, string> = {
  signal: "text-signal",
  heat: "text-heat",
  electric: "text-electric",
};

const inlineSectionIds = new Set([
  "kingdom-conference",
  "3d-sports-displays",
  "hi-vibe",
  "elite-home-sources",
  "ministry-linker",
  "river-of-life",
]);

export default function ProjectEntry({ project }: { project: Project }) {
  const href = inlineSectionIds.has(project.id) ? `#${project.id}` : project.href;

  if (project.layout === "feature") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-8 text-paper",
          layoutClasses[project.layout]
        )}
      >
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
        <div className="relative flex items-start justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-mist">{project.number}</span>
          <ArrowUpRight className="h-5 w-5 text-signal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <div className="relative flex flex-col gap-4">
          <h3 className="font-display text-5xl font-semibold tracking-tight text-signal sm:text-6xl">{project.title}</h3>
          <p className="max-w-sm text-sm leading-relaxed text-paper/70">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.disciplines.map((d) => (
              <Tag key={d} tone="paper">
                {d}
              </Tag>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("group relative flex flex-col overflow-hidden rounded-2xl", layoutClasses[project.layout])}
    >
      <div className={cn("relative flex-1 overflow-hidden rounded-2xl border border-ink/10", mediaHeightClasses[project.layout])}>
        <div className="absolute inset-0 scale-[1.01] saturate-[0.92] brightness-[0.96] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:saturate-100 group-hover:brightness-100">
          <ProjectMedia
            media={project.media}
            label={project.title}
            accent={project.accent}
            sizes="(min-width: 1024px) 60vw, 100vw"
            showPlaceholderLabel={false}
            parallax={project.layout === "large"}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent p-6 pt-20">
          <div className="flex items-center justify-between">
            <span className={cn("font-mono text-xs uppercase tracking-widest", accentText[project.accent ?? "signal"])}>
              {project.number}
            </span>
            <ArrowUpRight className="h-4 w-4 text-paper/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-paper" />
          </div>
          <h3 className={cn("mt-2 font-display font-medium tracking-tight text-paper", titleClasses[project.layout])}>
            {project.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-5">
        <p className="text-sm leading-relaxed text-ink/70">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.disciplines.map((d) => (
            <Tag key={d} tone="ink">
              {d}
            </Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
