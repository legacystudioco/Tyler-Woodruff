export type ProcessStep = {
  number: string;
  title: string;
  tagline: string;
  items: string[];
};

export const howIWorkSteps: ProcessStep[] = [
  { number: "01", title: "Understand", tagline: "What problem are we actually solving?", items: ["Research", "Users", "Business needs", "Constraints"] },
  { number: "02", title: "Structure", tagline: "Turn ambiguity into a system.", items: ["Flows", "Architecture", "Requirements", "Priorities", "Business logic"] },
  { number: "03", title: "Design", tagline: "Make the system understandable.", items: ["UX", "Interface", "Brand", "Interaction", "Content"] },
  { number: "04", title: "Build", tagline: "Make it real.", items: ["Frontend", "Backend", "AI", "Integrations", "Automation"] },
  { number: "05", title: "Refine", tagline: "Remove friction.", items: ["Testing", "Feedback", "Performance", "Polish"] },
  { number: "06", title: "Ship", tagline: "Put it in people's hands.", items: ["Deployment", "Documentation", "Training", "Iteration"] },
];
