"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const nodes = [
  { label: "Strategy", x: -27, y: -34 },
  { label: "Systems", x: 25, y: -36 },
  { label: "Research", x: -30, y: 2 },
  { label: "Journeys", x: 28, y: 0 },
  { label: "Logic", x: -14, y: 38 },
  { label: "Direction", x: 17, y: 38 },
];

const layers = [
  { w: 64, h: 44, rest: 10, active: -46 },
  { w: 78, h: 50, rest: 3, active: 0 },
  { w: 92, h: 56, rest: -6, active: 46 },
];

export default function ThinkPanel() {
  const [active, setActive] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setActive((v) => !v);
      }}
      className="relative flex h-80 w-full cursor-pointer items-center justify-center overflow-hidden bg-ink/40 pt-6 outline-none sm:h-96"
    >
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md"
          style={{ width: `${layer.w}%`, height: `${layer.h}%` }}
          animate={{
            y: active ? layer.active : layer.rest,
            opacity: active ? 0.9 : 0.6,
            scale: active ? 1 : 0.97,
          }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
        />
      ))}

      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        {active &&
          nodes.map((node, i) => {
            const next = nodes[(i + 1) % nodes.length];
            return (
              <motion.line
                key={node.label}
                x1={`${50 + node.x}%`}
                y1={`${50 + node.y}%`}
                x2={`${50 + next.x}%`}
                y2={`${50 + next.y}%`}
                stroke="var(--color-signal)"
                strokeWidth={1}
                strokeOpacity={0.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              />
            );
          })}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          style={{ transform: "translate(-50%, -50%)" }}
          className={cn(
            "absolute flex h-12 w-16 items-center justify-center rounded-lg border px-1.5 text-center font-mono text-[8px] uppercase leading-tight tracking-wider backdrop-blur-md sm:h-14 sm:w-[4.5rem] sm:text-[9px]",
            active
              ? "border-signal/60 bg-ink/80 text-signal shadow-[0_0_24px_rgba(199,255,0,0.25)]"
              : "border-white/15 bg-white/[0.05] text-mist"
          )}
          animate={{
            left: active ? `${50 + node.x}%` : `${50 + node.x * 0.16}%`,
            top: active ? `${50 + node.y}%` : `${50 + node.y * 0.16}%`,
            scale: active ? 1 : 0.9,
            zIndex: active ? 10 : nodes.length - i,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: active ? i * 0.03 : 0 }}
        >
          {node.label}
        </motion.div>
      ))}

      <div
        className={cn(
          "pointer-events-none absolute bottom-3 font-mono text-[10px] uppercase tracking-widest text-mist/40 transition-opacity duration-300",
          active ? "opacity-0" : "opacity-100"
        )}
      >
        Hover to expand
      </div>
    </div>
  );
}
