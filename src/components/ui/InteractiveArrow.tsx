"use client";

import { ArrowRight, ArrowDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type InteractiveArrowProps = {
  direction?: "right" | "down" | "up-right";
  className?: string;
};

const icons = {
  right: ArrowRight,
  down: ArrowDown,
  "up-right": ArrowUpRight,
};

export default function InteractiveArrow({ direction = "right", className }: InteractiveArrowProps) {
  const Icon = icons[direction];
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-all duration-300 ease-out group-hover:border-signal group-hover:bg-signal group-hover:text-ink group-hover:rotate-45",
        direction === "down" && "group-hover:translate-y-1 group-hover:rotate-0",
        className
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </span>
  );
}
