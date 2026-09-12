"use client";

import { motion } from "motion/react";
import { capabilities } from "@/data/capabilities";
import { cn } from "@/lib/utils";

const stages = ["Concept", "Build", "Iterate", "Ship"];
const buildItems = capabilities.find((c) => c.id === "build")?.items ?? [];

function Connector({ index }: { index: number }) {
  return (
    <div className="relative h-8 w-px bg-white/15">
      {[0, 1].map((dot) => (
        <motion.span
          key={dot}
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-electric"
          style={{ boxShadow: "0 0 8px var(--color-electric)" }}
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.4 + dot * 0.9,
          }}
        />
      ))}
    </div>
  );
}

export default function BuildPipelinePanel() {
  return (
    <div className="flex h-80 w-full items-center justify-center gap-6 bg-ink/40 pt-6 sm:h-96">
      <div className="flex shrink-0 flex-col items-center">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-col items-center">
            <motion.div
              className="flex w-20 items-center justify-center rounded-lg border border-electric/50 bg-white/[0.05] px-2 py-2.5 text-center font-mono text-[9px] uppercase tracking-wider text-electric backdrop-blur-md sm:text-[10px]"
              style={{ boxShadow: "0 0 20px rgba(61,90,254,0.15)" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              {stage}
            </motion.div>
            {i < stages.length - 1 ? <Connector index={i} /> : null}
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <svg width="28" height="90" viewBox="0 0 28 90" className="shrink-0 overflow-visible">
          <path d="M0 45 H10 M10 45 L24 10 M10 45 L24 45 M10 45 L24 80" stroke="var(--color-mist)" strokeOpacity={0.3} strokeWidth={1} fill="none" />
        </svg>
        <div className="flex max-w-[8.5rem] flex-wrap gap-2">
          {buildItems.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className={cn(
                "inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-mist backdrop-blur-sm"
              )}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
