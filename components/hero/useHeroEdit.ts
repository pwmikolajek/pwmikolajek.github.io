"use client";

import * as React from "react";
import {
  animate,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

export const TRACKING_FROM = 0.1;
export const TRACKING_TO = -0.02;

/** Per-line optical alignment: compensates the side bearing of "P" and "M". */
export const ALIGN_FROM = 0.06;
export const ALIGNS = [
  { id: "name-1", to: -0.04 },
  { id: "name-2", to: -0.01 },
] as const;

/** Glyphs that get hand-kerned. `index` is the character index in the name. */
export const KERNS = [
  { id: "aw", index: 2, to: -0.04 },
  { id: "ik", index: 8, to: 0.03 },
  { id: "la", index: 11, to: -0.03 },
] as const;

export const STAGES = [
  "idle",
  "select",
  "track",
  "align",
  "kern",
  "commit",
  "push",
  "pr",
  "checks",
  "merged",
] as const;
export type Stage = (typeof STAGES)[number];

export type HeroEdit = {
  tracking: MotionValue<number>;
  kerns: MotionValue<number>[];
  aligns: MotionValue<number>[];
  stage: Stage;
  /** How many kern rules have been added to the stylesheet so far. */
  kernCount: number;
  /** Index into KERNS of the pair being dragged right now. */
  activeKern: number | null;
  replay: () => void;
};

const ease = [0.65, 0, 0.35, 1] as const;

export function useHeroEdit(): HeroEdit {
  const reduce = useReducedMotion();
  const tracking = useMotionValue(TRACKING_FROM);
  const k0 = useMotionValue(0);
  const k1 = useMotionValue(0);
  const k2 = useMotionValue(0);
  const kerns = React.useMemo(() => [k0, k1, k2], [k0, k1, k2]);
  const a0 = useMotionValue(ALIGN_FROM);
  const a1 = useMotionValue(ALIGN_FROM);
  const aligns = React.useMemo(() => [a0, a1], [a0, a1]);

  const [stage, setStage] = React.useState<Stage>("idle");
  const [kernCount, setKernCount] = React.useState(0);
  const [activeKern, setActiveKern] = React.useState<number | null>(null);

  const run = React.useRef(0);
  const controls = React.useRef<{ stop: () => void }[]>([]);

  const cancel = React.useCallback(() => {
    run.current++;
    controls.current.forEach((c) => c.stop());
    controls.current = [];
  }, []);

  const play = React.useCallback(async () => {
    cancel();
    const id = run.current;
    const alive = () => id === run.current;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const tween = async (mv: MotionValue<number>, to: number, duration: number) => {
      const c = animate(mv, to, { duration, ease });
      controls.current.push(c);
      await c;
    };

    setActiveKern(null);
    if (reduce) {
      tracking.set(TRACKING_TO);
      kerns.forEach((mv, i) => mv.set(KERNS[i].to));
      aligns.forEach((mv, i) => mv.set(ALIGNS[i].to));
      setKernCount(KERNS.length);
      setStage("merged");
      return;
    }

    tracking.set(TRACKING_FROM);
    kerns.forEach((mv) => mv.set(0));
    aligns.forEach((mv) => mv.set(ALIGN_FROM));
    setKernCount(0);
    setStage("idle");

    await wait(1300);
    if (!alive()) return;
    setStage("select");
    await wait(600);
    if (!alive()) return;
    setStage("track");
    await wait(300);
    if (!alive()) return;
    await tween(tracking, TRACKING_TO, 1.8);
    if (!alive()) return;
    await wait(500);
    if (!alive()) return;

    setStage("align");
    await wait(400);
    if (!alive()) return;
    await Promise.all(aligns.map((mv, i) => tween(mv, ALIGNS[i].to, 0.9)));
    if (!alive()) return;
    await wait(600);
    if (!alive()) return;

    setStage("kern");
    for (let i = 0; i < KERNS.length; i++) {
      setKernCount(i + 1);
      setActiveKern(i);
      await wait(300);
      if (!alive()) return;
      await tween(kerns[i], KERNS[i].to, 0.7);
      if (!alive()) return;
      await wait(350);
      if (!alive()) return;
      setActiveKern(null);
      await wait(100);
      if (!alive()) return;
    }

    for (const [s, ms] of [
      ["commit", 2000],
      ["push", 1800],
      ["pr", 1300],
      ["checks", 1500],
    ] as const) {
      setStage(s);
      await wait(ms);
      if (!alive()) return;
    }
    setStage("merged");
  }, [cancel, reduce, tracking, kerns, aligns]);

  React.useEffect(() => {
    play();
    return cancel;
  }, [play, cancel]);

  return { tracking, kerns, aligns, stage, kernCount, activeKern, replay: play };
}

export function stageAtLeast(stage: Stage, target: Stage) {
  return STAGES.indexOf(stage) >= STAGES.indexOf(target);
}

export function formatEm(v: number) {
  const n = Math.abs(v) < 0.005 ? 0 : v;
  return `${n.toFixed(2)}em`;
}
