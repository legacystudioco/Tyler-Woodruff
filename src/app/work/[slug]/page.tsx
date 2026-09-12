import { notFound } from "next/navigation";
import CaseStudySection from "@/components/case-studies/CaseStudySection";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  return <CaseStudySection project={project} />;
}
