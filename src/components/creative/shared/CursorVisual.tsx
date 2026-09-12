"use client";

import { useRef } from "react";

const accentVar = {
  signal: "var(--color-signal)",
  heat: "var(--color-heat)",
  electric: "var(--color-electric)",
};

export default function CursorVisual({ accent }: { accent: keyof typeof accentVar }) {
  const ref = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLSpanElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    const shape = shapeRef.current;
    if (!el || !shape) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    shape.style.transform = `translate(-50%, -50%) translate(${x * 30}px, ${y * 30}px) rotate(${x * 20}deg)`;
  }

  function handleLeave() {
    const shape = shapeRef.current;
    if (shape) shape.style.transform = "translate(-50%, -50%)";
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="relative h-full w-full">
      <span
        ref={shapeRef}
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border transition-transform duration-200 ease-out"
        style={{ borderColor: accentVar[accent] }}
      />
      <span
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: accentVar[accent] }}
      />
    </div>
  );
}
