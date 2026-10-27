import { capabilities } from "@/data/capabilities";

export default function ThinkDesignBuild() {
  return (
    <div className="grid gap-16 lg:grid-cols-3 lg:gap-10">
      {capabilities.map((capability) => (
        <div key={capability.id} className="flex flex-col gap-4 border-t border-white/10 pt-8">
          <h3 className="font-display text-4xl font-medium tracking-tight text-paper sm:text-5xl">
            {capability.title}
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-mist">{capability.tagline}</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-mist">
            {capability.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-signal/70" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
