"use client";

import * as React from "react";
import { buildActivity, levelFor } from "@/content/activity";

const { weeks, year, last30, busiest } = buildActivity();

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
const fmtShort = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
const month = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });

/** Month label for the first week whose Sunday starts a new month. */
const monthLabels = weeks.map((days, w) => {
  const first = days[0];
  if (!first) return "";
  const m = month(first.date);
  const prev = w > 0 ? weeks[w - 1][0] : null;
  return !prev || month(prev.date) !== m ? m : "";
});

type Tip = { x: number; y: number; text: string };

export function PrActivity() {
  const wrap = React.useRef<HTMLDivElement>(null);
  const grid = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const [tip, setTip] = React.useState<Tip | null>(null);
  const last = React.useRef<string>("");

  React.useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reset = React.useCallback(() => {
    last.current = "";
    setTip(null);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const root = wrap.current;
    const g = grid.current;
    if (!root || !g) return;

    // Work from pointer geometry, not e.target, so the gaps between cells
    // don't flicker the tooltip.
    const gr = g.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(g).columnGap) || 0;
    const pitch = (gr.width + gap) / weeks.length;
    const fx = (e.clientX - gr.left) / pitch - 0.5;
    const fy = (e.clientY - gr.top) / pitch - 0.5;
    if (fx < -1 || fx > weeks.length || fy < -1 || fy > 7) return reset();

    const w = Math.min(weeks.length - 1, Math.max(0, Math.round(fx)));
    const d = Math.min(6, Math.max(0, Math.round(fy)));
    const key = `${w}:${d}`;
    if (key === last.current) return;
    last.current = key;

    const day = weeks[w][d];
    if (!day) return setTip(null);
    const rr = root.getBoundingClientRect();
    setTip({
      x: Math.min(Math.max(gr.left - rr.left + w * pitch + (pitch - gap) / 2, 72), rr.width - 72),
      y: gr.top - rr.top + d * pitch,
      text: `${day.count} ${day.count === 1 ? "pull request" : "pull requests"} · ${fmt(day.date)}`,
    });
  };

  return (
    <div
      ref={wrap}
      className="relative"
      role="img"
      aria-label={`Pull request activity: ${last30} pull requests in the last 30 days, ${year} in the last year, busiest day ${busiest.count} on ${fmt(busiest.date)}. Chart shows the last six months.`}
    >
      <div className="mb-6 font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
        Pull requests opened
      </div>

      <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
        <div className="flex shrink-0 gap-10 md:w-[200px] md:flex-col md:gap-7">
          <Stat value={last30} label="in the last 30 days" />
          <Stat value={year} label="in the last year" />
          <Stat value={busiest.count} label={`on the busiest day, ${fmtShort(busiest.date)}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex gap-[2px] sm:gap-1" aria-hidden>
            {monthLabels.map((m, w) => (
              <div key={w} className="min-w-0 flex-1">
                <span className="block h-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                  {m}
                </span>
              </div>
            ))}
          </div>

          <div
            ref={grid}
            className="pr-graph flex gap-[2px] sm:gap-1"
            data-in={inView}
            onPointerMove={onMove}
            onPointerLeave={reset}
          >
            {weeks.map((days, w) => (
              <div key={w} className="grid min-w-0 flex-1 grid-rows-7 gap-[2px] sm:gap-1">
                {days.map((day, d) => (
                  <span
                    key={d}
                    data-l={day ? levelFor(day.count) : "x"}
                    className="pr-cell"
                    style={{ "--w": w, "--d": d } as React.CSSProperties}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
            <span>Last 6 months</span>
            <span className="flex items-center gap-1.5">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} data-l={l} className="pr-cell !size-[10px] !animate-none" />
              ))}
              More
            </span>
          </div>
        </div>
      </div>

      {tip && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[4px] border border-[var(--hairline-strong)] bg-[var(--bg)] px-2 py-1 font-mono text-[11px] text-[var(--fg)]"
          style={{ left: tip.x, top: tip.y - 8 }}
        >
          {tip.text}
        </div>
      )}
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none tracking-[var(--tracking-display)] text-[var(--fg)] font-tnum">
        {value}
      </div>
      <div className="mt-2 text-[13px] leading-snug text-[var(--muted)]">{label}</div>
    </div>
  );
}
