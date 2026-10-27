"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const lines: { text: string; accent?: boolean }[] = [
  { text: "connecting ideas," },
  { text: "to identity,", accent: true },
  { text: "and the experience." },
];

export default function ConnectiveStatement() {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-6 px-4 py-10 text-center lg:col-span-4">
      <div className="flex flex-col gap-1">
        {lines.map((line, i) => (
          <motion.p
            key={line.text}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            className={cn(
              "font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl",
              line.accent ? "text-electric" : "text-ink"
            )}
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      <div className="relative h-px w-16 bg-ink/15">
        <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-electric motion-safe:animate-flow-x" />
      </div>
    </div>
  );
}
