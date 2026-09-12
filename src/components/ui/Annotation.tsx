import { cn } from "@/lib/utils";

type AnnotationProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Annotation({ children, className }: AnnotationProps) {
  return (
    <div className={cn("flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mist/80", className)}>
      <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
      {children}
    </div>
  );
}
