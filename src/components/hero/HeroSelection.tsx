"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type HeroSelectionContextValue = {
  selectedId: string | null;
  select: (id: string) => void;
  clear: () => void;
};

const HeroSelectionContext = createContext<HeroSelectionContextValue | null>(null);

export function HeroSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const select = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);
  const clear = useCallback(() => setSelectedId(null), []);

  useEffect(() => {
    if (!selectedId) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  return (
    <HeroSelectionContext.Provider value={{ selectedId, select, clear }}>{children}</HeroSelectionContext.Provider>
  );
}

export function useHeroSelection() {
  const ctx = useContext(HeroSelectionContext);
  if (!ctx) throw new Error("useHeroSelection must be used within HeroSelectionProvider");
  return ctx;
}
