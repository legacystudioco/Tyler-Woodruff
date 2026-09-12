"use client";

import { useHeroSelection } from "./HeroSelection";
import { cn } from "@/lib/utils";

export default function HeroSceneBackground({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { clear } = useHeroSelection();
  return (
    <div className={cn(className)} onClick={clear}>
      {children}
    </div>
  );
}
