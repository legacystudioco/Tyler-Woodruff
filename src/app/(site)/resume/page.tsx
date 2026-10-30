import Link from "next/link";
import { Download, Mail } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import DisplayHeading from "@/components/ui/DisplayHeading";
import { assetExists } from "@/lib/assets";
import { contact, resumeAssetPath } from "@/data/site";

export default function ResumePage() {
  const hasResume = assetExists(resumeAssetPath);

  return (
    <Section theme="ink" className="flex min-h-screen flex-col justify-center px-6 py-32 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <Eyebrow>Résumé</Eyebrow>
        <DisplayHeading as="h1" size="lg">
          {hasResume ? "Download my résumé." : "The latest résumé isn't uploaded yet."}
        </DisplayHeading>
        <p className="max-w-xl text-balance text-lg leading-relaxed text-mist">
          {hasResume
            ? "PDF, updated to reflect current roles and projects."
            : "In the meantime, email me directly and I'll send the current version right away."}
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          {hasResume ? (
            <Link
              href={contact.resumeHref}
              download
              className="group inline-flex items-center gap-3 rounded-full bg-signal px-7 py-4 font-mono text-xs uppercase tracking-wider text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Link>
          ) : null}
          <Link
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-4 font-mono text-xs uppercase tracking-wider text-paper transition-colors duration-300 hover:border-paper"
          >
            <Mail className="h-3.5 w-3.5" />
            {contact.email}
          </Link>
        </div>
      </div>
    </Section>
  );
}
