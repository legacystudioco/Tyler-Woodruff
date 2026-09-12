"use client";

import { motion } from "motion/react";
import { Lightbulb, Palette, Film, Settings, Map, Users, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = { lightbulb: Lightbulb, palette: Palette, film: Film, settings: Settings, map: Map, users: Users };

export type ProcessStep = { label: string; icon: keyof typeof icons };

export default function CreativeProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1">
      <div className="col-span-full hidden lg:grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((step, i) => {
          const Icon = icons[step.icon];
          return (
            <div key={step.label} className="relative flex flex-col items-center gap-4 px-2 text-center">
              {i < steps.length - 1 ? (
                <div className="absolute left-1/2 top-7 h-px w-full bg-heat/25" aria-hidden />
              ) : null}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-heat/40 bg-ink text-heat backdrop-blur-md"
                style={{ boxShadow: "0 0 20px rgba(255,77,61,0.15)" }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 + 0.1 }}
                className="font-mono text-[11px] uppercase tracking-wider text-mist"
              >
                {step.label}
              </motion.span>
            </div>
          );
        })}
      </div>

      <div className="col-span-full flex flex-col items-center gap-8 lg:hidden">
        {steps.map((step, i) => {
          const Icon = icons[step.icon];
          return (
            <div key={step.label} className="flex flex-col items-center gap-3">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border border-heat/40 bg-white/[0.04] text-heat"
                style={{ boxShadow: "0 0 20px rgba(255,77,61,0.15)" }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-mist">{step.label}</span>
              {i < steps.length - 1 ? <div className="h-6 w-px bg-heat/25" aria-hidden /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
