import { capabilities } from "@/data/capabilities";
import TechnicalFrame from "@/components/ui/TechnicalFrame";
import ThinkPanel from "./ThinkPanel";
import DesignSpherePanel from "./DesignSpherePanel";
import BuildPipelinePanel from "./BuildPipelinePanel";

const panels = {
  think: { Component: ThinkPanel, index: "01", label: "System" },
  design: { Component: DesignSpherePanel, index: "02", label: "Structure" },
  build: { Component: BuildPipelinePanel, index: "03", label: "Pipeline" },
};

export default function ThinkDesignBuild() {
  return (
    <div className="grid gap-16 lg:grid-cols-3 lg:gap-10">
      {capabilities.map((capability) => {
        const { Component, index, label } = panels[capability.id as keyof typeof panels];
        return (
          <div key={capability.id} className="flex flex-col gap-7 border-t border-white/10 pt-8">
            <h3 className="font-display text-4xl font-medium tracking-tight text-paper sm:text-5xl">
              {capability.title}
            </h3>
            <TechnicalFrame index={index} label={label}>
              <Component />
            </TechnicalFrame>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-mist">
              {capability.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-signal/70" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
