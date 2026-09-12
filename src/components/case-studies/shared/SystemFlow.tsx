"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type FlowStep = {
  label: string;
  detail?: string;
};

export default function SystemFlow({
  steps,
  accent = "signal",
  className,
}: {
  steps: FlowStep[];
  accent?: "signal" | "heat" | "electric";
  className?: string;
}) {
  const accentBorder = accent === "heat" ? "border-heat/50 text-heat" : accent === "electric" ? "border-electric/50 text-electric" : "border-signal/50 text-signal";
  const accentLine = accent === "heat" ? "bg-heat" : accent === "electric" ? "bg-electric" : "bg-signal";

  return (
    <div className={cn("mx-auto flex max-w-xs flex-col items-center", className)}>
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={cn(
              "flex w-full min-w-[220px] items-center justify-between gap-4 rounded-lg border bg-white/[0.04] px-4 py-3 backdrop-blur-md",
              accentBorder
            )}
          >
            <span className="font-mono text-xs uppercase tracking-wider">{step.label}</span>
            {step.detail ? <span className="font-mono text-[10px] uppercase tracking-wider text-mist/60">{step.detail}</span> : null}
          </motion.div>
          {i < steps.length - 1 ? (
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 + 0.15 }}
              style={{ transformOrigin: "top" }}
              className={cn("h-8 w-px origin-top opacity-40", accentLine)}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
