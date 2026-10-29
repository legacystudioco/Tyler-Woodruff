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

// Raw evidence for the human score. Only events the browser marks as
// trusted (real user input) are counted, so scripted scrolling doesn't qualify.
type Signals = {
  webdriver: boolean;
  plugins: number;
  hasWindow: boolean;
  focused: boolean;
  scrolls: number;
  moves: number;
  turns: number;
  wheels: number;
  touches: number;
  keys: number;
  clicks: number;
};

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
    const signals: Signals = {
      webdriver: navigator.webdriver === true,
      plugins: navigator.plugins?.length ?? 0,
      hasWindow: window.outerWidth > 0 && window.outerHeight > 0,
      focused: document.hasFocus(),
      scrolls: 0,
      moves: 0,
      turns: 0,
      wheels: 0,
      touches: 0,
      keys: 0,
      clicks: 0,
    };
    let lastAngle: number | null = null;

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
        signals,
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
      if (!signals.focused && document.hasFocus()) signals.focused = true;
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

    const markInput = (event: Event, key: "wheels" | "touches" | "keys" | "clicks") => {
      lastInput = Date.now();
      if (event.isTrusted) signals[key] += 1;
    };
    // Counts direction changes: a hand wobbles, a script tends to jump or glide straight.
    const onPointerMove = (event: PointerEvent) => {
      lastInput = Date.now();
      if (!event.isTrusted || event.pointerType === "touch") return;
      if (Math.abs(event.movementX) + Math.abs(event.movementY) < 2) return;
      signals.moves += 1;
      const angle = Math.atan2(event.movementY, event.movementX);
      if (lastAngle !== null) {
        const diff = Math.abs(angle - lastAngle);
        if (Math.min(diff, 2 * Math.PI - diff) > 0.35) signals.turns += 1;
      }
      lastAngle = angle;
    };
    const onWheel = (event: WheelEvent) => markInput(event, "wheels");
    const onTouch = (event: TouchEvent) => markInput(event, "touches");
    const onKey = (event: KeyboardEvent) => markInput(event, "keys");
    const onPointerDown = (event: PointerEvent) => markInput(event, "clicks");
    const onScroll = () => {
      signals.scrolls += 1;
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
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      flush(true);
      window.clearInterval(tickTimer);
      window.clearInterval(flushTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname]);

  return null;
}
