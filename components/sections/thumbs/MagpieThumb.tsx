"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const PAGES = [
  "/case-studies/magpie/thumb/01.png", // cover (white)
  "/case-studies/magpie/thumb/04.png", // inkblots (light) — body of chapter 1
  "/case-studies/magpie/thumb/03.png", // chapter opener (black)
  "/case-studies/magpie/thumb/02.png", // contents (black)
  "/case-studies/magpie/thumb/05.png", // body with screenshots (light)
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
// Column width inside the thumb (as % of thumb width).
// Smaller column = narrower pages = more pages visible in the thumb at once,
// so the rest state reads as a "stack of pages" not "one big page".
const COL_WIDTH_PCT = 38;
// Aspect of each page (A4: 1 / 1.414 ≈ 0.707)
const PAGE_ASPECT = 1 / 1.414;
const GAP_PX = 12;

export function MagpieThumb({ hovered }: { hovered: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#ece9e2]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] text-[#151515]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 14px)",
        }}
      />

      <Column hovered={hovered && !reduced} />

      {/* Top + bottom fade so the column reads as a viewport, not a hard edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10"
        style={{
          background:
            "linear-gradient(to bottom, #ece9e2 0%, rgba(236,233,226,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10"
        style={{
          background:
            "linear-gradient(to top, #ece9e2 0%, rgba(236,233,226,0) 100%)",
        }}
      />
    </div>
  );
}

const PAN_MS = 380;
const HOLD_MS = 800;

function Column({ hovered }: { hovered: boolean }) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const pageRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [offsets, setOffsets] = React.useState<number[]>([0]);
  const [step, setStep] = React.useState(0);

  const recompute = React.useCallback(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const innerHeight = inner.offsetHeight;
    const wrapHeight = wrap.offsetHeight;
    const maxTravel = Math.max(0, innerHeight - wrapHeight + 32);

    const ys = pageRefs.current.map((el) => {
      if (!el) return 0;
      const top = el.offsetTop;
      return Math.min(maxTravel, Math.max(0, top - 16));
    });
    setOffsets(ys);
  }, []);

  React.useLayoutEffect(() => {
    recompute();
    const ro = new ResizeObserver(recompute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    pageRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [recompute]);

  // Drive the step cycle while hovered.
  React.useEffect(() => {
    if (!hovered) {
      setStep(0);
      return;
    }
    let cursor = 0;
    const tick = () => {
      cursor = (cursor + 1) % PAGES.length;
      setStep(cursor);
    };
    // First tick after pan + hold; subsequent ticks every pan + hold.
    const interval = setInterval(tick, PAN_MS + HOLD_MS);
    return () => clearInterval(interval);
  }, [hovered]);

  const targetY = hovered ? -(offsets[step] ?? 0) : 0;

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 flex items-start justify-center"
      style={{ paddingTop: 16, paddingBottom: 16 }}
    >
      <motion.div
        ref={innerRef}
        className="flex flex-col"
        animate={{ y: targetY }}
        transition={{
          duration: hovered ? PAN_MS / 1000 : 0.6,
          ease: EASE_OUT,
        }}
        style={{
          width: `${COL_WIDTH_PCT}%`,
          gap: GAP_PX,
          willChange: "transform",
        }}
      >
        {PAGES.map((src, i) => (
          <div
            key={src}
            ref={(el) => {
              pageRefs.current[i] = el;
            }}
            className="shrink-0 overflow-hidden bg-white"
            style={{
              borderRadius: 4,
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.55) inset, 0 14px 30px -14px rgba(0,0,0,0.4), 0 1px 0 rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={src}
              alt=""
              aria-hidden
              draggable={false}
              className="block w-full"
              style={{ height: "auto" }}
              loading={i === 0 ? "eager" : "lazy"}
              onLoad={recompute}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
