import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  theme?: "ink" | "paper";
  className?: string;
};

const themeMap = {
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
};

export default function Section({ children, id, theme = "ink", className }: SectionProps) {
  return (
    <section id={id} data-theme={theme} className={cn("relative overflow-hidden", themeMap[theme], className)}>
      {children}
    </section>
  );
}
