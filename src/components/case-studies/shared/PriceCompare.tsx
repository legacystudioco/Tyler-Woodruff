import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CompareColumn = {
  title: string;
  steps: string[];
  price: string;
  accent: "signal" | "heat";
  note: string;
};

const columns: CompareColumn[] = [
  {
    title: "Standard Design",
    steps: ["Team template", "Colors", "Preview"],
    price: "$26.99",
    accent: "signal",
    note: "Recoloring an existing supported template.",
  },
  {
    title: "Custom Design",
    steps: ["Identity / pattern change", "Custom configuration", "Preview"],
    price: "$34.99",
    accent: "heat",
    note: "Changing name, city, or stripe/pattern geometry.",
  },
];

export default function PriceCompare() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {columns.map((col) => (
        <div
          key={col.title}
          className={cn(
            "flex flex-col gap-5 rounded-2xl border bg-white/[0.03] p-6 backdrop-blur-md",
            col.accent === "heat" ? "border-heat/30" : "border-signal/30"
          )}
        >
          <span className={cn("font-mono text-xs uppercase tracking-widest", col.accent === "heat" ? "text-heat" : "text-signal")}>
            {col.title}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {col.steps.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-mist">
                  {step}
                </span>
                {i < col.steps.length - 1 ? <ArrowRight className="h-3 w-3 text-mist/40" /> : null}
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-end justify-between border-t border-white/10 pt-4">
            <p className="max-w-[14rem] text-xs leading-relaxed text-mist">{col.note}</p>
            <span className="font-display text-3xl font-semibold text-paper">{col.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
