"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Check, GitPullRequest } from "lucide-react";

/* ---------- shared ---------- */

/**
 * Drives a looping step counter while the art is on screen. Renders the final
 * state before it scrolls into view and for reduced-motion users.
 */
function useLoop(steps: number, ms: number, hold: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.5 });
  const [tick, setTick] = React.useState(steps - 1);

  React.useEffect(() => {
    if (reduce || !inView) return;
    setTick(0);
    const id = setInterval(() => setTick((t) => (t + 1) % (steps + hold)), ms);
    return () => clearInterval(id);
  }, [reduce, inView, steps, ms, hold]);

  return [ref, Math.min(tick, steps - 1)] as const;
}

const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

function Frame({
  children,
  canvas,
  frameRef,
}: {
  children: React.ReactNode;
  canvas?: boolean;
  frameRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-[var(--hairline)]"
      style={{
        containerType: "inline-size",
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        backgroundImage: canvas
          ? "radial-gradient(var(--hairline-strong) 0.6px, transparent 0.7px)"
          : undefined,
        backgroundSize: canvas ? "4cqw 4cqw" : undefined,
        fontFamily: "var(--font-hanken), sans-serif",
      }}
    >
      {children}
    </div>
  );
}

const mono = { fontFamily: "var(--font-geist-mono), monospace" } as const;

/* ---------- the UI being designed ---------- */

const CHIP = {
  Draft: { bg: "#ece9e9", fg: "#625b5b" },
  "In review": { bg: "#e4e4e4", fg: "#444444" },
  Approved: { bg: "#131313", fg: "#ffffff" },
} as const;

function ProposalCard({ step }: { step?: number }) {
  const live = step !== undefined;
  const s = step ?? 0;
  const status = !live ? "Draft" : s >= 4 ? "Approved" : s >= 3 ? "In review" : "Draft";
  const pressed = live && s === 4;
  const avatars = ["#131313", "#6b6b6b", "#a8a8a8"];

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: !live || s >= 1 ? 1 : 0,
        y: !live || s >= 1 ? 0 : 14,
        scale: !live || s >= 1 ? 1 : 0.94,
      }}
      transition={spring}
      className="relative w-[62cqw] rounded-[2.4cqw] border border-black/10 bg-[#fbfafa] p-[4cqw] text-[#131313] shadow-[0_3cqw_6cqw_-3cqw_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center gap-[2.4cqw]">
        <div className="grid size-[8cqw] place-items-center rounded-[1.8cqw] bg-[#2a2a2a] text-[2.8cqw] font-semibold text-white">
          HP
        </div>
        <div className="min-w-0">
          <div className="text-[3.6cqw] font-semibold leading-none tracking-[-0.02em]">
            Harbour Press
          </div>
          <div className="mt-[1cqw] text-[2.4cqw] text-[#625b5b]">Project proposal</div>
        </div>
      </div>

      <div className="mt-[3.6cqw] flex items-center justify-between">
        <div className="flex -space-x-[1.2cqw]">
          {avatars.map((c, i) => (
            <motion.span
              key={c}
              initial={false}
              animate={{ scale: !live || s >= 2 ? 1 : 0 }}
              transition={{ ...spring, delay: live ? i * 0.07 : 0 }}
              className="size-[5cqw] rounded-full border-[0.5cqw] border-[#fbfafa]"
              style={{ background: c }}
            />
          ))}
          <motion.span
            initial={false}
            animate={{ scale: !live || s >= 2 ? 1 : 0 }}
            transition={{ ...spring, delay: live ? 0.21 : 0 }}
            className="grid size-[5cqw] place-items-center rounded-full border-[0.5cqw] border-[#fbfafa] bg-[#ece9e9] text-[1.8cqw] text-[#625b5b]"
          >
            +2
          </motion.span>
        </div>
        <motion.span
          animate={{ backgroundColor: CHIP[status].bg, color: CHIP[status].fg }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-[0.8cqw] rounded-full px-[2.2cqw] py-[0.8cqw] text-[2.3cqw] font-semibold"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-[0.8cqw]"
            >
              {status === "Approved" && <Check className="size-[2.6cqw]" strokeWidth={3} />}
              {status}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </div>

      <div className="mt-[3.6cqw] h-px bg-[#e2dede]" />

      <motion.div
        animate={{ scale: pressed ? 0.94 : 1 }}
        transition={{ duration: 0.12 }}
        className="mt-[3.2cqw] ml-auto w-fit rounded-[1.6cqw] bg-[#131313] px-[3.2cqw] py-[1.8cqw] text-[2.6cqw] font-semibold text-white"
      >
        Send for review
      </motion.div>

      {live && (
        <motion.div
          initial={false}
          animate={
            s >= 3
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 0, x: "12cqw", y: "10cqw" }
          }
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          className="pointer-events-none absolute bottom-[1cqw] right-[5cqw]"
        >
          <svg
            viewBox="0 0 16 16"
            style={{ width: "4.4cqw", height: "4.4cqw" }}
            fill="#131313"
            stroke="#fff"
            strokeLinejoin="round"
          >
            <path d="M2 1.5v11.2l3.1-2.9 2.1 4.6 2-.9-2.1-4.5h4.3z" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ---------- 01 Design: a static, specced mockup ---------- */

export function DesignArt() {
  return (
    <Frame canvas>
      <span
        className="absolute left-[6cqw] top-[5cqw] text-[2.2cqw] text-[var(--muted)]"
        style={mono}
      >
        Card / Default
      </span>

      <div className="absolute inset-x-0 top-[13cqw] flex justify-center">
        <div className="relative">
          <ProposalCard />
          <span className="pointer-events-none absolute -inset-[1.6cqw] border border-[var(--fg)]">
            {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map((p, i) => (
              <span
                key={p}
                className={`absolute ${p} size-[1.8cqw] border border-[var(--fg)] bg-[var(--bg)]`}
                style={{
                  transform: `translate(${i % 2 ? "50%" : "-50%"}, ${i < 2 ? "-50%" : "50%"})`,
                }}
              />
            ))}
          </span>
          <span
            className="absolute -bottom-[7.2cqw] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[0.6cqw] bg-[var(--fg)] px-[1.4cqw] py-[0.6cqw] text-[2cqw] text-[var(--bg)]"
            style={mono}
          >
            Hug × Hug
          </span>
        </div>
      </div>

      <div className="absolute bottom-[4cqw] left-[6cqw] flex items-center gap-[1.2cqw]">
        {["#131313", "#4a4a4a", "#8a8a8a", "#c4c4c4", "#ece9e9"].map((c) => (
          <span
            key={c}
            className="size-[3.4cqw] rounded-full border border-white/15"
            style={{ background: c }}
          />
        ))}
        <span className="ml-[1.4cqw] text-[2cqw] text-[var(--muted)]" style={mono}>
          Hanken 600
        </span>
      </div>
    </Frame>
  );
}

/* ---------- 02 Motion: same card, animated, with a timeline ---------- */

export function MotionArt() {
  const [ref, s] = useLoop(6, 800, 3);
  return (
    <Frame canvas frameRef={ref}>
      <div className="absolute inset-x-0 top-[8cqw] flex justify-center">
        <ProposalCard step={s} />
      </div>

      <div className="absolute inset-x-[6cqw] bottom-[4cqw]">
        <div className="relative h-[5cqw]">
          <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--hairline-strong)]" />
          {[1, 2, 3, 4, 5].map((k) => (
            <span
              key={k}
              className="absolute top-1/2 size-[2cqw] -translate-x-1/2 -translate-y-1/2 rotate-45 transition-colors duration-200"
              style={{
                left: `${(k / 5) * 100}%`,
                background: s >= k ? "var(--fg)" : "var(--bg)",
                border: "1px solid var(--fg)",
              }}
            />
          ))}
          <motion.span
            initial={false}
            animate={{ left: `${(s / 5) * 100}%` }}
            transition={{ duration: 0.8, ease: "linear" }}
            className="absolute -top-[0.5cqw] bottom-[-0.5cqw] w-px bg-[var(--fg)]"
          >
            <span className="absolute -top-[0.4cqw] left-1/2 size-[1.6cqw] -translate-x-1/2 rounded-[0.4cqw] bg-[var(--fg)]" />
          </motion.span>
        </div>
        <div
          className="mt-[1.2cqw] flex justify-between text-[1.8cqw] text-[var(--muted)]"
          style={mono}
        >
          <span>0.0s</span>
          <span>ease-out · 800ms</span>
          <span>4.0s</span>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- 03 Frontend: the PR opens ---------- */

const CHECKS = ["Lint", "Types", "Preview deploy"];

export function FrontendArt() {
  const [ref, s] = useLoop(8, 650, 4);
  const show = (n: number) => s >= n;

  return (
    <Frame frameRef={ref}>
      <div className="absolute inset-x-[6cqw] top-1/2 -translate-y-1/2 rounded-[2cqw] border border-[var(--hairline-strong)] bg-[var(--bg)] p-[4cqw]">
        <div className="flex items-center gap-[2cqw]">
          <GitPullRequest
            className="size-[4.4cqw] shrink-0 transition-colors duration-300"
            style={{ color: show(7) ? "var(--fg)" : "var(--muted)" }}
          />
          <motion.span
            initial={false}
            animate={{ opacity: show(1) ? 1 : 0, x: show(1) ? 0 : -6 }}
            transition={{ duration: 0.3 }}
            className="truncate text-[3.2cqw] font-semibold tracking-[-0.01em] text-[var(--fg)]"
          >
            Add proposal card
          </motion.span>
          <motion.span
            initial={false}
            animate={{ scale: show(7) ? 1 : 0, opacity: show(7) ? 1 : 0 }}
            transition={spring}
            className="ml-auto shrink-0 rounded-full bg-[var(--fg)] px-[2.2cqw] py-[0.7cqw] text-[2.2cqw] font-semibold text-[var(--bg)]"
          >
            Open
          </motion.span>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: show(2) ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-[2.4cqw] flex items-center gap-[2cqw] pl-[6.4cqw] text-[2.2cqw] text-[var(--muted)]"
          style={mono}
        >
          <span>#129</span>
          <span>feat/proposal-card → main</span>
          <span className="ml-auto">
            <span style={{ color: "var(--fg)" }}>+86</span>{" "}
            <span>−12</span>
          </span>
        </motion.div>

        <div className="mt-[3.2cqw] border-t border-[var(--hairline)] pt-[3cqw]">
          {CHECKS.map((label, i) => {
            const queued = show(3);
            const done = show(4 + i);
            return (
              <motion.div
                key={label}
                initial={false}
                animate={{ opacity: queued ? 1 : 0, y: queued ? 0 : 5 }}
                transition={{ duration: 0.25, delay: queued ? i * 0.06 : 0 }}
                className="flex items-center gap-[2cqw] py-[1cqw] text-[2.5cqw] text-[var(--fg)]"
              >
                <span className="grid size-[3.6cqw] shrink-0 place-items-center">
                  {done ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={spring}
                      className="grid size-[3.6cqw] place-items-center rounded-full bg-[var(--fg)] text-[var(--bg)]"
                    >
                      <Check className="size-[2.2cqw]" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <span className="size-[3cqw] animate-spin rounded-full border-[0.45cqw] border-[var(--hairline-strong)] border-t-[var(--fg)] motion-reduce:animate-none" />
                  )}
                </span>
                {label}
                <span className="ml-auto text-[2cqw] text-[var(--muted)]" style={mono}>
                  {done ? "passed" : "running"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}
