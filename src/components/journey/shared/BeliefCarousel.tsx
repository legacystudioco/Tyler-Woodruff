"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Belief } from "@/data/journey/beliefs";
import BeliefVisualPanel from "./BeliefVisuals";
import { cn } from "@/lib/utils";

export default function BeliefCarousel({ beliefs }: { beliefs: Belief[] }) {
  const [index, setIndex] = useState(0);
  const active = beliefs[index];

  function go(next: number) {
    setIndex((next + beliefs.length) % beliefs.length);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  }

  return (
    <div className="flex flex-col gap-10" onKeyDown={handleKeyDown}>
      <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:min-h-[320px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60 transition-all duration-500"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(199,255,0,0.10), transparent 70%)" }}
          aria-hidden
        />
        <div className="absolute inset-6 opacity-40 sm:inset-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`visual-${active.id}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              <BeliefVisualPanel variant={active.visual} />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-lg text-balance text-center font-display text-2xl font-medium leading-snug text-paper sm:text-3xl"
          >
            &ldquo;{active.statement}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous belief"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper transition-colors hover:border-signal hover:text-signal"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5">
          {beliefs.map((belief, i) => (
            <button
              key={belief.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to belief ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-signal" : "w-1.5 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next belief"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper transition-colors hover:border-signal hover:text-signal"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
