// Estimates how likely a visit was a person rather than an automated browser
// (email link scanners, crawlers, uptime checks). It's a weighted guess from
// behaviour, not proof — a determined bot can fake any of these.

export type HumanSignals = {
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

// Cloud data-center towns where nearly all traffic is machines.
const DATA_CENTER_TOWNS = new Set([
  "boydton|va",
  "ashburn|va",
  "dulles town center|va",
  "sterling|va",
  "council bluffs|ia",
  "the dalles|or",
  "boardman|or",
  "prineville|or",
  "quincy|wa",
  "moncks corner|sc",
  "pryor|ok",
  "lenoir|nc",
]);

const count = (value: unknown, max = 100_000) => Math.max(0, Math.min(max, Math.round(Number(value) || 0)));

export function parseSignals(raw: unknown): HumanSignals | null {
  if (!raw || typeof raw !== "object") return null;
  const s = raw as Record<string, unknown>;
  return {
    webdriver: s.webdriver === true,
    plugins: count(s.plugins, 100),
    hasWindow: s.hasWindow !== false,
    focused: s.focused === true,
    scrolls: count(s.scrolls),
    moves: count(s.moves),
    turns: count(s.turns),
    wheels: count(s.wheels),
    touches: count(s.touches),
    keys: count(s.keys),
    clicks: count(s.clicks),
  };
}

export function isDataCenterTown(city: string | null, region: string | null) {
  return Boolean(city && region && DATA_CENTER_TOWNS.has(`${city.toLowerCase()}|${region.toLowerCase()}`));
}

export function humanScore(signals: HumanSignals | null, userAgent: string, dataCenter: boolean) {
  if (!signals) return 0;
  if (signals.webdriver || /headless/i.test(userAgent)) return 2;

  let score = 15;

  // Real input from a hand on a mouse, trackpad, screen or keyboard.
  if (signals.moves > 0) score += 10;
  if (signals.moves >= 8 && signals.turns >= 3) score += 25;
  if (signals.wheels > 0) score += 20;
  if (signals.touches > 0) score += 35;
  if (signals.touches >= 5) score += 15;
  if (signals.keys > 0) score += 5;
  if (signals.clicks > 0) score += 10;
  if (signals.focused) score += 5;

  // The page scrolled, but nothing a person does made it scroll.
  const anyInput = signals.moves + signals.wheels + signals.touches + signals.keys + signals.clicks > 0;
  if (signals.scrolls > 0 && !anyInput) score -= 10;

  // Headless browsers often report no window size or no built-in PDF viewer.
  if (!signals.hasWindow) score -= 15;
  if (signals.plugins === 0 && /chrome/i.test(userAgent) && !/mobile|android/i.test(userAgent)) score -= 10;

  if (dataCenter) score -= 25;

  return Math.max(1, Math.min(99, score));
}
