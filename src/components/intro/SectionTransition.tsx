export default function SectionTransition() {
  return (
    <div
      className="relative h-40 w-full overflow-hidden sm:h-44 lg:h-56"
      style={{ background: "linear-gradient(to bottom, var(--color-ink) 50%, var(--color-paper) 50%)" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display text-[22vw] font-semibold leading-none tracking-tight text-paper sm:text-[20vw] lg:text-[13vw]"
          style={{ clipPath: "inset(0 0 50% 0)" }}
          aria-hidden
        >
          01
        </span>
        <span
          className="absolute font-display text-[22vw] font-semibold leading-none tracking-tight text-ink sm:text-[20vw] lg:text-[13vw]"
          style={{ clipPath: "inset(50% 0 0 0)" }}
          aria-hidden
        >
          01
        </span>
      </div>
      <div className="absolute left-6 top-[20%] -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-mist/60 lg:left-12 lg:top-[27%]">
        Next
      </div>
      <div className="absolute right-6 top-[80%] -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-ink/50 lg:right-12 lg:top-[73%]">
        Selected Work
      </div>
    </div>
  );
}
