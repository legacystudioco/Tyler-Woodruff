"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ParallaxLayer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="h-full w-full overflow-hidden">
      <motion.div style={{ y }} className="h-[112%] w-full -translate-y-[6%]">
        {children}
      </motion.div>
    </div>
  );
}
