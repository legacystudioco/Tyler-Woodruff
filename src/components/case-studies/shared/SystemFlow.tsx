"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type FlowStep = {
  label: string;
  detail?: string;
};

const COLUMNS = 3;
const SEGMENT_DURATION = 0.7;

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

const accentDotClass = { signal: "bg-signal", heat: "bg-heat", electric: "bg-electric" } as const;
type Accent = keyof typeof accentDotClass;

/**
 * A single pulse that travels the whole path once per `duration`, appearing only
 * during its own slice [index/total, (index+1)/total] — so one dot visibly hands
 * off from connector to connector rather than every connector pulsing independently.
 */
function PulseDot({
  index,
  total,
  orientation,
  accent,
  duration,
  reverse = false,
}: {
  index: number;
  total: number;
  orientation: "horizontal" | "vertical";
  accent: Accent;
  duration: number;
  /** True when this connector sits in a flex-row-reverse row — the dot's on-screen
   * travel direction must flip too, since row-reverse only reorders siblings and
   * never mirrors a child's own internal left-to-right rendering. */
  reverse?: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const eps = (end - start) * 0.12;
  const times = [0, start, start + eps, end - eps, end, 1];
  const progress = reverse ? [1, 1, 1, 0, 0, 0] : [0, 0, 0, 1, 1, 1];
  const travel = progress.map((p) => `${p * 100}%`);
  const opacity = [0, 0, 1, 1, 0, 0];

  return (
    <motion.span
      className={cn("pointer-events-none absolute h-1.5 w-1.5 rounded-full", accentDotClass[accent])}
      style={
        orientation === "horizontal"
          ? { top: "50%", marginTop: -3, marginLeft: -3 }
          : { left: "50%", marginLeft: -3, marginTop: -3 }
      }
      animate={orientation === "horizontal" ? { left: travel, opacity } : { top: travel, opacity }}
      transition={{ duration, times, repeat: Infinity, ease: "linear" }}
    />
  );
}

function ConnectorLine({
  orientation,
  className,
  children,
}: {
  orientation: "horizontal" | "vertical";
  className?: string;
  children?: React.ReactNode;
}) {
  const isHorizontal = orientation === "horizontal";
  return (
    <div className={cn("relative shrink-0", isHorizontal ? "h-px w-8 sm:w-12" : "h-8 w-px", className)}>
      <div className="absolute inset-0 bg-white/15" />
      {children}
    </div>
  );
}

export default function SystemFlow({
  steps,
  accent = "signal",
  className,
}: {
  steps: FlowStep[];
  accent?: Accent;
  className?: string;
}) {
  const accentBorder = accent === "heat" ? "border-heat/50 text-heat" : accent === "electric" ? "border-electric/50 text-electric" : "border-signal/50 text-signal";
  const rows = chunk(steps, COLUMNS);
  const totalConnectors = Math.max(steps.length - 1, 1);
  const duration = totalConnectors * SEGMENT_DURATION;
  let connectorIndex = 0;

  return (
    <div className={cn("mx-auto w-full max-w-2xl", className)}>
      {/* sm+: snake flow grid, one pulse travels box to box through the whole path */}
      <div className="hidden flex-col items-center sm:flex">
        {rows.map((row, rowIndex) => {
          const reversed = rowIndex % 2 === 1;
          return (
            <div key={rowIndex} className="flex flex-col">
              <div className={cn("flex items-center", reversed && "flex-row-reverse")}>
                {row.map((step, i) => {
                  const globalIndex = rowIndex * COLUMNS + i;
                  const thisConnector = i > 0 ? connectorIndex++ : null;
                  return (
                    <Fragment key={step.label}>
                      {thisConnector !== null ? (
                        <ConnectorLine orientation="horizontal">
                          <PulseDot
                            index={thisConnector}
                            total={totalConnectors}
                            orientation="horizontal"
                            accent={accent}
                            duration={duration}
                            reverse={reversed}
                          />
                        </ConnectorLine>
                      ) : null}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.45, delay: globalIndex * 0.07 }}
                        className={cn(
                          "flex w-[170px] flex-col items-center gap-0.5 rounded-lg border bg-white/[0.04] px-3 py-3 text-center backdrop-blur-md",
                          accentBorder
                        )}
                      >
                        <span className="font-mono text-xs uppercase tracking-wider">{step.label}</span>
                        {step.detail ? <span className="font-mono text-[10px] uppercase tracking-wider text-mist/60">{step.detail}</span> : null}
                      </motion.div>
                    </Fragment>
                  );
                })}
              </div>
              {rowIndex < rows.length - 1
                ? (() => {
                    const vIndex = connectorIndex++;
                    return (
                      <div className="relative h-8">
                        <div className={cn("absolute top-0", reversed ? "left-[85px]" : "right-[85px]")}>
                          <ConnectorLine orientation="vertical">
                            <PulseDot index={vIndex} total={totalConnectors} orientation="vertical" accent={accent} duration={duration} />
                          </ConnectorLine>
                        </div>
                      </div>
                    );
                  })()
                : null}
            </div>
          );
        })}
      </div>

      {/* mobile: simple vertical list, same single traveling pulse */}
      <div className="mx-auto flex max-w-xs flex-col items-center sm:hidden">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "flex w-full min-w-[220px] items-center justify-between gap-4 rounded-lg border bg-white/[0.04] px-4 py-3 backdrop-blur-md",
                accentBorder
              )}
            >
              <span className="font-mono text-xs uppercase tracking-wider">{step.label}</span>
              {step.detail ? <span className="font-mono text-[10px] uppercase tracking-wider text-mist/60">{step.detail}</span> : null}
            </motion.div>
            {i < steps.length - 1 ? (
              <ConnectorLine orientation="vertical">
                <PulseDot index={i} total={totalConnectors} orientation="vertical" accent={accent} duration={duration} />
              </ConnectorLine>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
