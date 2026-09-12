import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";
import DisplayHeading from "./DisplayHeading";

type SectionHeaderProps = {
  eyebrow?: string;
  heading: React.ReactNode;
  supporting?: React.ReactNode;
  align?: "start" | "split";
  theme?: "ink" | "paper";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  heading,
  supporting,
  align = "start",
  theme = "ink",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "split" && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className
      )}
    >
      <div className="flex flex-col gap-5">
        {eyebrow ? <Eyebrow tone={theme === "paper" ? "ink" : "signal"}>{eyebrow}</Eyebrow> : null}
        <DisplayHeading size="md" as="h2">
          {heading}
        </DisplayHeading>
      </div>
      {supporting ? (
        <p className={cn("max-w-sm text-sm leading-relaxed lg:text-base", theme === "paper" ? "text-ink/60" : "text-mist")}>
          {supporting}
        </p>
      ) : null}
    </div>
  );
}
