"use client";

import * as React from "react";
import { motion, motionValue, useTransform, type MotionValue } from "framer-motion";
import { LiveValue } from "./LiveValue";
import { KERNS, type HeroEdit } from "./useHeroEdit";

const ZERO = motionValue(0);
const tag =
  "absolute z-10 whitespace-nowrap rounded-[3px] bg-[var(--edit)] px-1.5 py-[3px] font-mono text-[10px] font-normal normal-case leading-none tracking-normal text-white";

function EditCursor({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className}
      fill="var(--edit)"
      stroke="#fff"
      strokeWidth="1"
      strokeLinejoin="round"
    >
      <path d="M2 1.5v11.2l3.1-2.9 2.1 4.6 2-.9-2.1-4.5h4.3z" />
    </svg>
  );
}

export function EditableName({ text, edit }: { text: string; edit: HeroEdit }) {
  const letterSpacing = useTransform(edit.tracking, (v) => `${v}em`);
  const selected =
    edit.stage === "select" ||
    edit.stage === "track" ||
    edit.stage === "align" ||
    edit.stage === "kern";

  let index = 0;
  const words = text.split(" ").map((word) => {
    const chars = Array.from(word).map((char) => ({ char, i: index++ }));
    index++; // the space
    return chars;
  });

  return (
    <span className="relative inline-block self-start">
      <motion.h1
        aria-label={text}
        style={{ letterSpacing }}
        className="font-display leading-[0.96] text-[clamp(3.5rem,15vw,8rem)] lg:text-[clamp(3.5rem,9.5vw,9rem)]"
      >
        {words.map((chars, w) => (
          <AlignedLine key={w} offset={edit.aligns[w]}>
            {chars.map(({ char, i }) => {
              const k = KERNS.findIndex((x) => x.index === i);
              return (
                <Glyph
                  key={i}
                  char={char}
                  delay={0.1 + i * 0.025}
                  kern={k >= 0 ? edit.kerns[k] : undefined}
                  kernId={k >= 0 ? KERNS[k].id : undefined}
                  active={k >= 0 && edit.activeKern === k}
                />
              );
            })}
          </AlignedLine>
        ))}
      </motion.h1>

      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 border border-[var(--edit)] transition-opacity duration-300"
        style={{ opacity: selected ? 1 : 0 }}
      >
        {[
          "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
          "right-0 top-0 translate-x-1/2 -translate-y-1/2",
          "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
          "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
        ].map((pos) => (
          <span
            key={pos}
            className={`absolute ${pos} size-[7px] border border-[var(--edit)] bg-white`}
          />
        ))}
        <span className="absolute left-0 top-1/2 size-[7px] -translate-x-1/2 -translate-y-1/2 border border-[var(--edit)] bg-white">
          {edit.stage === "align" && (
            <>
              <EditCursor className="absolute left-1 top-1 z-10" />
              <span className={`${tag} left-5 top-4`}>
                x <LiveValue value={edit.aligns[0]} />
              </span>
            </>
          )}
        </span>
        <span className="absolute right-0 top-1/2 size-[7px] -translate-y-1/2 translate-x-1/2 border border-[var(--edit)] bg-white">
          {edit.stage === "track" && (
            <>
              <EditCursor className="absolute left-1 top-1 z-10" />
              <span className={`${tag} left-5 top-4`}>
                tracking <LiveValue value={edit.tracking} />
              </span>
            </>
          )}
        </span>
      </span>
    </span>
  );
}

function AlignedLine({
  offset,
  children,
}: {
  offset: MotionValue<number>;
  children: React.ReactNode;
}) {
  const marginLeft = useTransform(offset, (v) => `${v}em`);
  return (
    <motion.span style={{ marginLeft }} className="block whitespace-nowrap">
      {children}
    </motion.span>
  );
}

function Glyph({
  char,
  delay,
  kern,
  kernId,
  active,
}: {
  char: string;
  delay: number;
  kern?: MotionValue<number>;
  kernId?: string;
  active: boolean;
}) {
  const marginLeft = useTransform(kern ?? ZERO, (v) => `${v}em`);
  return (
    <motion.span
      aria-hidden
      className="hero-glyph relative inline-block"
      style={{ marginLeft }}
      initial={{ opacity: 0, y: "0.4em" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {char}
      {active && kern && (
        <>
          <span className="absolute -bottom-1 -top-1 left-0 w-px bg-[var(--edit)]" />
          <EditCursor className="absolute left-0 top-[58%] z-10 -translate-x-[3px]" />
          <span className={`${tag} left-2 top-[calc(58%+18px)]`}>
            {kernId} <LiveValue value={kern} />
          </span>
        </>
      )}
    </motion.span>
  );
}
