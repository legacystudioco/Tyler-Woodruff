export type BeliefVisual = "resolve" | "signal" | "impact" | "prototype" | "execute" | "system" | "detail";

export type Belief = {
  id: string;
  statement: string;
  visual: BeliefVisual;
};

export const beliefs: Belief[] = [
  { id: "complexity", statement: "Complexity should disappear for the user.", visual: "resolve" },
  { id: "design", statement: "Design isn't decoration. It's how the system communicates.", visual: "signal" },
  { id: "technology", statement: "Technology matters when it improves someone's experience.", visual: "impact" },
  { id: "prototype", statement: "The best prototype is often something you can actually use.", visual: "prototype" },
  { id: "execution", statement: "Creative ideas become valuable when someone figures out how to execute them.", visual: "execute" },
  { id: "systems", statement: "Good systems create room for people to do better work.", visual: "system" },
  { id: "details", statement: "Details aren't details when people can feel them.", visual: "detail" },
];
