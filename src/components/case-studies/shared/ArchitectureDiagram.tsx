"use client";

import { motion } from "motion/react";

const leaves = ["Authentication", "Database", "Storage", "Application Data / Services"];

function Node({ label, delay, primary }: { label: string; delay: number; primary?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
      className={
        primary
          ? "rounded-lg border border-electric/50 bg-white/[0.05] px-5 py-3 font-mono text-xs uppercase tracking-wider text-electric backdrop-blur-md"
          : "rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-mist backdrop-blur-md"
      }
      style={primary ? { boxShadow: "0 0 24px rgba(61,90,254,0.18)" } : undefined}
    >
      {label}
    </motion.div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-0">
      <Node label="User" delay={0} primary />
      <div className="h-8 w-px bg-electric/30" />
      <Node label="Next.js / Application" delay={0.08} primary />
      <div className="h-8 w-px bg-electric/30" />
      <Node label="Supabase" delay={0.16} primary />

      <motion.div
        className="h-8 w-px bg-electric/30"
        style={{ transformOrigin: "top" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.24 }}
      />

      <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
        {leaves.map((leaf, i) => (
          <Node key={leaf} label={leaf} delay={0.32 + i * 0.06} />
        ))}
      </div>
    </div>
  );
}
