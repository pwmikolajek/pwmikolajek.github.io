"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, GitMerge, GitPullRequest, RotateCcw } from "lucide-react";
import { LiveValue } from "./LiveValue";
import { ALIGNS, KERNS, stageAtLeast, type HeroEdit, type Stage } from "./useHeroEdit";

const BRANCH = "hero/tune-type";

export function CodePanel({ edit }: { edit: HeroEdit }) {
  const { stage } = edit;
  const at = (s: Stage) => stageAtLeast(stage, s);
  const tracking = stage === "track";
  const aligning = stage === "align";

  return (
    <div className="relative">
      <div
        aria-hidden
        className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--hairline)] font-mono text-[12px] leading-6"
      >
        <div className="flex items-center gap-2 border-b border-[var(--hairline)] px-4 py-2.5 text-[11px] text-[var(--muted)]">
          <span className="size-1.5 rounded-full bg-[var(--hairline-strong)]" />
          styles/hero.css
          <span
            className="ml-auto mr-8 transition-opacity duration-300"
            style={{ opacity: at("track") && !at("commit") ? 1 : 0 }}
          >
            modified
          </span>
        </div>

        <div className="px-4 py-3">
          <Line>
            <span className="text-[var(--fg)]">h1</span> {"{"}
          </Line>
          <Line>
            {"  "}
            <span className="text-[var(--muted)]">font:</span> 400 9rem/0.96
            var(--font-display);
          </Line>
          <Line mark={at("track")} hot={tracking}>
            {"  "}
            <span className="text-[var(--muted)]">letter-spacing:</span>{" "}
            <Value hot={tracking}>
              <LiveValue value={edit.tracking} />
            </Value>
            ;
          </Line>
          <Line>{"}"}</Line>
          {ALIGNS.map((a, n) => (
            <Line key={a.id} mark={at("align")} hot={aligning} hidden={!at("align")}>
              <span className="text-[var(--fg)]">.{a.id}</span> {"{ "}
              <span className="text-[var(--muted)]">margin-left:</span>{" "}
              <Value hot={aligning}>
                <LiveValue value={edit.aligns[n]} />
              </Value>
              {"; }"}
            </Line>
          ))}
          {KERNS.map((k, n) => {
            const shown = edit.kernCount > n;
            const hot = edit.activeKern === n;
            return (
              <Line key={k.id} mark={shown} hot={hot} hidden={!shown}>
                <span className="text-[var(--fg)]">.kern-{k.id}</span> {"{ "}
                <span className="text-[var(--muted)]">margin-left:</span>{" "}
                <Value hot={hot}>
                  <LiveValue value={edit.kerns[n]} />
                </Value>
                {"; }"}
              </Line>
            );
          })}
        </div>

        <div className="border-t border-[var(--hairline)] px-4 pb-4 pt-3">
          <Typed show={at("commit")} text={`$ git switch -c ${BRANCH}`} />
          <Typed
            show={at("commit")}
            delay={0.8}
            text='$ git commit -am "Tune hero type"'
          />
          <Typed
            show={at("push")}
            text={`$ git push -u origin ${BRANCH}`}
          />
          <div className="h-6 text-[var(--muted)]">
            {at("push") && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95, duration: 0.2 }}
                className="inline-flex items-center gap-1.5"
              >
                <Check className="size-3" /> pushed to origin
              </motion.span>
            )}
          </div>

          <div className="mt-2 h-[68px]">
            {at("pr") && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-md border border-[var(--hairline-strong)] px-3 py-2"
              >
                <div className="flex items-center gap-2 font-sans text-[13px] text-[var(--fg)]">
                  {stage === "merged" ? (
                    <GitMerge className="size-4 shrink-0 text-[var(--merged)]" />
                  ) : (
                    <GitPullRequest className="size-4 shrink-0 text-[var(--open)]" />
                  )}
                  <span className="truncate">Tune hero type</span>
                  <span
                    className="ml-auto shrink-0 rounded-full px-2 text-[11px] leading-5 text-white transition-colors duration-300"
                    style={{
                      background:
                        stage === "merged" ? "var(--merged)" : "var(--open)",
                    }}
                  >
                    {stage === "merged" ? "Merged" : "Open"}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 pl-6 text-[11px] text-[var(--muted)]">
                  <span>#128</span>
                  <span>
                    <span className="text-[var(--open)]">+6</span>{" "}
                    <span className="text-[var(--removed)]">−1</span>
                  </span>
                  <span
                    className="inline-flex items-center gap-1 transition-opacity duration-300"
                    style={{ opacity: at("checks") ? 1 : 0 }}
                  >
                    <Check className="size-3 text-[var(--open)]" /> 3 checks passed
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={edit.replay}
        aria-label="Replay animation"
        className="absolute right-2 top-1.5 grid size-7 place-items-center rounded-md text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--fg)]"
      >
        <RotateCcw className="size-3.5" />
      </button>
    </div>
  );
}

function Line({
  children,
  mark,
  hot,
  hidden,
}: {
  children: React.ReactNode;
  mark?: boolean;
  hot?: boolean;
  hidden?: boolean;
}) {
  return (
    <div
      className="relative whitespace-pre text-[var(--muted)] transition-opacity duration-300"
      style={{ opacity: hidden ? 0 : 1 }}
    >
      <span
        className="absolute -left-4 top-0.5 bottom-0.5 w-[2px] transition-opacity duration-300"
        style={{
          background: "var(--edit)",
          opacity: mark ? (hot ? 1 : 0.5) : 0,
        }}
      />
      {children}
    </div>
  );
}

function Value({ hot, children }: { hot: boolean; children: React.ReactNode }) {
  return (
    <span
      className="rounded-[3px] px-1 transition-colors duration-200"
      style={{
        background: hot ? "var(--edit)" : "transparent",
        color: hot ? "#fff" : "var(--fg)",
      }}
    >
      {children}
    </span>
  );
}

/** One terminal line that types itself out once `show` flips on. */
function Typed({
  show,
  text,
  delay = 0,
}: {
  show: boolean;
  text: string;
  delay?: number;
}) {
  const n = text.length;
  return (
    <div className="h-6 whitespace-pre text-[var(--fg)]">
      {show && (
        <motion.span
          className="inline-block"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{
            delay,
            duration: n * 0.018,
            ease: (t: number) => Math.round(t * n) / n,
          }}
        >
          <span className="text-[var(--muted)]">$ </span>
          {text.slice(2)}
        </motion.span>
      )}
    </div>
  );
}
