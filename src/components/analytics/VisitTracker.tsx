"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ENDPOINT = "/api/pulse";
const TICK_MS = 500;
const FLUSH_MS = 15_000;
const IDLE_MS = 60_000;
// Holding still this long inside a section counts as a stop to look.
const STOP_MS = 1_500;

type SectionStat = { ms: number; stops: number; firstMs: number };

const randomId = () => crypto.randomUUID().replace(/-/g, "");

function visitorId() {
  try {
    let id = localStorage.getItem("tw_vid");
    if (!id) {
      id = randomId();
      localStorage.setItem("tw_vid", id);
    }
    return id;
  } catch {
    return randomId();
  }
}

// "parent/child" for nested sections, e.g. "kingdom-conference/kingdom-identity".
function sectionAtViewportCenter() {
  const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
  const chain: string[] = [];
  let node = element?.closest<HTMLElement>("section[id]") ?? null;
  while (node) {
    chain.unshift(node.id);
    node = node.parentElement?.closest<HTMLElement>("section[id]") ?? null;
  }
  if (!chain.length) return null;
  return chain.length > 1 ? `${chain[0]}/${chain[chain.length - 1]}` : chain[0];
}

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const visit = randomId();
    const visitor = visitorId();
    const referrer = document.referrer;
    const sections = new Map<string, SectionStat>();
    let activeMs = 0;
    let maxScroll = 0;
    let lastInput = Date.now();
    let lastScroll = Date.now();
    let stoppedIn: string | null = null;
    let dirty = true;

    const measureScroll = () => {
      const height = document.documentElement.scrollHeight;
      const reached = height <= window.innerHeight ? 100 : ((window.scrollY + window.innerHeight) / height) * 100;
      maxScroll = Math.max(maxScroll, Math.min(100, Math.round(reached)));
    };

    const flush = (leaving: boolean) => {
      if (!dirty) return;
      dirty = false;
      const body = JSON.stringify({
        visit,
        visitor,
        path: pathname,
        referrer,
        maxScroll,
        activeMs,
        sections: [...sections].map(([name, stat]) => [name, stat.ms, stat.stops, stat.firstMs]),
      });
      if (leaving && navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      } else {
        fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
      }
    };

    const tick = () => {
      const now = Date.now();
      if (document.hidden || now - lastInput > IDLE_MS) return;
      activeMs += TICK_MS;
      const name = sectionAtViewportCenter();
      if (name) {
        let stat = sections.get(name);
        if (!stat) {
          stat = { ms: 0, stops: 0, firstMs: activeMs };
          sections.set(name, stat);
        }
        stat.ms += TICK_MS;
        if (now - lastScroll >= STOP_MS && stoppedIn !== name) {
          stat.stops += 1;
          stoppedIn = name;
        }
      }
      dirty = true;
    };

    const onInput = () => {
      lastInput = Date.now();
    };
    const onScroll = () => {
      lastInput = lastScroll = Date.now();
      stoppedIn = null;
      measureScroll();
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") flush(true);
    };
    const onPageHide = () => flush(true);

    measureScroll();
    flush(false);

    const tickTimer = window.setInterval(tick, TICK_MS);
    const flushTimer = window.setInterval(() => flush(false), FLUSH_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onInput, { passive: true });
    window.addEventListener("keydown", onInput);
    window.addEventListener("touchstart", onInput, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      flush(true);
      window.clearInterval(tickTimer);
      window.clearInterval(flushTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onInput);
      window.removeEventListener("keydown", onInput);
      window.removeEventListener("touchstart", onInput);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname]);

  return null;
}
