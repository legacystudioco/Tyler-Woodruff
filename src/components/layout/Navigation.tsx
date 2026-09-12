"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [theme, setTheme] = useState<"ink" | "paper">("ink");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const next = visible.target.getAttribute("data-theme");
          if (next === "ink" || next === "paper") setTheme(next);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isPaper = theme === "paper";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? (isPaper ? "bg-paper/80 backdrop-blur-md" : "bg-ink/70 backdrop-blur-md") : "bg-transparent"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 transition-colors duration-500 lg:px-12",
          isPaper ? "text-ink" : "text-paper"
        )}
      >
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          TW<span className="text-signal">/</span>
        </Link>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wider md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative py-1 opacity-80 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className={cn(
              "group hidden items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-300 sm:inline-flex",
              isPaper
                ? "border-ink/20 hover:border-ink hover:bg-ink hover:text-paper"
                : "border-paper/25 hover:border-signal hover:bg-signal hover:text-ink"
            )}
          >
            Let&rsquo;s Talk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-current/25 md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-x-0 top-[73px] bottom-0 z-40 flex flex-col gap-8 bg-ink px-6 py-10 text-paper md:hidden">
          <ul className="flex flex-col gap-6 font-display text-3xl">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-signal px-4 py-2 font-mono text-xs uppercase tracking-wider text-signal"
          >
            Let&rsquo;s Talk <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
