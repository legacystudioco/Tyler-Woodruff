import { cn } from "@/lib/utils";

type DisplayHeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  className?: string;
};

const sizeMap = {
  xl: "text-[13vw] leading-[0.88] sm:text-[10vw] lg:text-[7.5vw]",
  lg: "text-5xl leading-[0.95] sm:text-6xl lg:text-7xl",
  md: "text-3xl leading-[1.05] sm:text-4xl lg:text-5xl",
};

export default function DisplayHeading({ children, as = "h2", size = "lg", className }: DisplayHeadingProps) {
  const Tag = as;
  return (
    <Tag className={cn("font-display font-medium tracking-tight text-balance", sizeMap[size], className)}>
      {children}
    </Tag>
  );
}
