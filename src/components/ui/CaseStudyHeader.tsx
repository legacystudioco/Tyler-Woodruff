import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/types/content";
import Tag from "@/components/ui/Tag";
import DisplayHeading from "@/components/ui/DisplayHeading";

export default function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-10 pt-32">
      <Link
        href="/#work"
        className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-mist transition-colors hover:text-paper"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to work
      </Link>

      <div className="flex flex-col gap-6">
        <span className="font-mono text-xs uppercase tracking-widest text-signal">{project.number}</span>
        <DisplayHeading as="h1" size="lg">
          {project.title}
        </DisplayHeading>
        <p className="max-w-2xl text-balance text-lg leading-relaxed text-mist">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.disciplines.map((d) => (
            <Tag key={d} tone="mist">
              {d}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
