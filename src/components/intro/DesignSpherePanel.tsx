"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const CENTER = 120;

const shells = [
  { label: "UX / UI", radius: 46, rotate: -35, span: 62 },
  { label: "Experience Design", radius: 46, rotate: 145, span: 62 },
  { label: "Brand Systems", radius: 68, rotate: 8, span: 58 },
  { label: "Content", radius: 68, rotate: 188, span: 58 },
  { label: "Visual Storytelling", radius: 90, rotate: 55, span: 54 },
  { label: "Interaction Design", radius: 90, rotate: 235, span: 54 },
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function DesignSpherePanel() {
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
      className="relative flex h-80 w-full cursor-pointer items-center justify-center overflow-hidden bg-ink/40 pt-6 outline-none [perspective:1100px] sm:h-96"
    >
      <div className="relative h-[85%] w-[85%] max-w-[280px]" style={{ transform: "rotateX(38deg) rotateZ(-6deg)" }}>
        <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible">
          <defs>
            <radialGradient id="core-grad" cx="35%" cy="32%" r="75%">
              <stop offset="0%" stopColor="rgba(199,255,0,0.45)" />
              <stop offset="55%" stopColor="var(--color-graphite)" />
              <stop offset="100%" stopColor="var(--color-ink)" />
            </radialGradient>
          </defs>

          {[46, 68, 90].map((r) => (
            <circle key={r} cx={CENTER} cy={CENTER} r={r} fill="none" stroke="var(--color-signal)" strokeOpacity={0.12} strokeWidth={1} />
          ))}

          {shells.map((shell, i) => {
            const circumference = 2 * Math.PI * shell.radius;
            const dash = (shell.span / 360) * circumference;
            const midAngle = shell.rotate + shell.span / 2;
            const dist = active ? 42 + i * 3 : 0;
            const dx = Math.cos(toRad(midAngle)) * dist;
            const dy = Math.sin(toRad(midAngle)) * dist;

            return (
              <motion.circle
                key={shell.label}
                cx={CENTER}
                cy={CENTER}
                r={shell.radius}
                fill="none"
                stroke="var(--color-signal)"
                strokeWidth={active ? 2.5 : 1.5}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeLinecap="round"
                animate={{ x: dx, y: dy, rotate: shell.rotate, opacity: active ? 1 : 0.55 }}
                transition={{ type: "spring", stiffness: 150, damping: 18, delay: active ? i * 0.05 : (shells.length - i) * 0.02 }}
              />
            );
          })}

          <circle cx={CENTER} cy={CENTER} r={30} fill="url(#core-grad)" stroke="var(--color-signal)" strokeOpacity={0.6} strokeWidth={1.5} />
          <circle cx={CENTER} cy={CENTER} r={3} fill="var(--color-signal)" />
        </svg>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-3 font-mono text-[10px] uppercase tracking-widest text-mist/40 transition-opacity duration-300",
          active ? "opacity-0" : "opacity-100"
        )}
      >
        Hover to explode
      </div>
    </div>
  );
}
