import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Section from "@/components/ui/Section";
import { contact } from "@/data/site";

export default function ContactSection() {
  const mailHref = `mailto:${contact.email}`;

  return (
    <Section id="contact" theme="ink" className="grain flex flex-col justify-between pb-16 pt-28 lg:pt-36">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 lg:px-12">
        <DisplayText />

        <p className="max-w-lg text-balance text-lg leading-relaxed text-mist lg:text-xl">
          I&rsquo;m always interested in ambitious ideas, difficult problems, and work that doesn&rsquo;t fit neatly
          into one category.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={mailHref}
            className="group inline-flex items-center gap-3 rounded-full bg-signal px-7 py-4 font-mono text-xs uppercase tracking-wider text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a Conversation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href={mailHref}
            className="group inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-4 font-mono text-xs uppercase tracking-wider text-paper transition-colors duration-300 hover:border-paper"
          >
            <Mail className="h-3.5 w-3.5" />
            {contact.email}
          </Link>

          {contact.linkedin ? (
            <Link
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-4 font-mono text-xs uppercase tracking-wider text-paper transition-colors duration-300 hover:border-paper"
            >
              LinkedIn
            </Link>
          ) : null}

          <Link
            href={contact.resumeHref}
            className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-4 font-mono text-xs uppercase tracking-wider text-paper transition-colors duration-300 hover:border-paper"
          >
            Download Résumé
          </Link>
        </div>
      </div>

      <Footer />
    </Section>
  );
}

function DisplayText() {
  return (
    <h2 className="font-display text-[13vw] font-medium leading-[0.9] tracking-tight sm:text-[9vw] lg:text-[6.5vw]">
      Have something
      <br />
      <span className="text-signal">interesting to build?</span>
    </h2>
  );
}

function Footer() {
  return (
    <div className="mt-24 border-t border-white/10 pt-10 lg:mt-32">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 lg:px-12">
        <p className="font-display text-[10vw] font-semibold leading-none tracking-tight text-paper/95 sm:text-[7vw] lg:text-[5vw]">
          TYLER WOODRUFF<span className="text-signal">.</span>
        </p>
        <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-widest text-mist/50 sm:flex-row sm:items-center sm:justify-between">
          <span>Creative Technologist — Ohio</span>
          <span>&copy; {new Date().getFullYear()} Tyler Woodruff</span>
        </div>
      </div>
    </div>
  );
}
