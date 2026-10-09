"use client";

import * as React from "react";
import { buildActivity, levelFor } from "@/content/activity";

const { weeks, total } = buildActivity();

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

type Tip = { x: number; y: number; text: string };

export function PrActivity() {
  const wrap = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const [tip, setTip] = React.useState<Tip | null>(null);
  const last = React.useRef<string>("");
  const grid_ = React.useRef<HTMLDivElement>(null);

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
    const grid = grid_.current;
    if (!root || !grid) return;

    // Work from pointer geometry, not e.target, so the gaps between cells
    // don't flicker the tooltip.
    const gr = grid.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
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
      aria-label={`Contribution graph: ${total} pull requests opened in the last 12 months`}
    >
      <div className="mb-3 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
        <span>Pull requests opened</span>
        <span>
          <span className="font-tnum text-[var(--fg)]">{total}</span> · last 12 months
        </span>
      </div>

      <div
        ref={grid_}
        className="pr-graph flex gap-[2px] sm:gap-[3px]"
        data-in={inView}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        {weeks.map((days, w) => (
          <div key={w} className="grid min-w-0 flex-1 grid-rows-7 gap-[2px] sm:gap-[3px]">
            {days.map((day, d) => (
              <span
                key={d}
                data-w={w}
                data-d={d}
                data-l={day ? levelFor(day.count) : "x"}
                className="pr-cell"
                style={{ "--w": w, "--d": d } as React.CSSProperties}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
        Less
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} data-l={l} className="pr-cell !size-[10px] !animate-none" />
        ))}
        More
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
