"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
// Near-critically damped: tiles snap onto the board, no wobble.
const TILE_SPRING = { type: "spring", stiffness: 520, damping: 38, mass: 0.75 } as const;

// Full-bleed board: 16 × 10 square cells exactly fill the card's 16:10 thumb.
const COLS = 16;
const ROWS = 10;
const INK = "#1a1a1a";

// MIKOLAJEK across row 4; PAWEL down col 8; the words share the A at (4,8).
const ACROSS_ROW = 4;
const DOWN_COL = 8;

const ACROSS = [
  { c: "M", v: 3, col: 3 },
  { c: "I", v: 1, col: 4 },
  { c: "K", v: 5, col: 5 },
  { c: "O", v: 1, col: 6 },
  { c: "L", v: 1, col: 7 },
  { c: "A", v: 1, col: 8 },
  { c: "J", v: 8, col: 9 },
  { c: "E", v: 1, col: 10 },
  { c: "K", v: 5, col: 11 },
];

// The hover move, top to bottom, skipping the shared A at row 4.
const DOWN = [
  { c: "P", v: 3, row: 3 },
  { c: "W", v: 4, row: 5 },
  { c: "E", v: 1, row: 6 },
  { c: "L", v: 1, row: 7 },
];

const DROP_DELAY = (i: number) => 0.05 + i * 0.045;
// The board scores MIKOLAJEK once the last tile lands.
const SCORE_DELAY = DROP_DELAY(DOWN.length - 1) + 0.2;

function cellStyle(row: number, col: number): React.CSSProperties {
  return {
    left: `${(col / COLS) * 100}%`,
    top: `${(row / ROWS) * 100}%`,
    width: `${100 / COLS}%`,
    height: `${100 / ROWS}%`,
  };
}

/**
 * Letter Clash thumbnail. A board mid-game: MIKOLAJEK is already played
 * across, with dashed slots marking the next move. On hover PAWEL drops in
 * tile by tile through the shared A — the two words cross to spell the full
 * name, the A pulses as the words connect, and the move scores.
 */
export function LetterClashThumb({ hovered }: { hovered: boolean }) {
  const reduced = !!useReducedMotion();
  const active = !!hovered;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#fcfbf8]">
      {/* Camera layer: board and tiles zoom together */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ scale: active && !reduced ? 1.03 : 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: `${100 / COLS}% ${100 / ROWS}%`,
        }}
        aria-hidden
      >
        {/* Dashed slots where the hover move will land */}
        {DOWN.map(({ row }) => (
          <div key={`ghost-${row}`} className="absolute" style={cellStyle(row, DOWN_COL)}>
            <div
              className="absolute"
              style={{
                inset: "9%",
                borderRadius: 5,
                border: "1.5px dashed rgba(21,21,21,0.16)",
              }}
            />
          </div>
        ))}

        {/* An earlier move, played and faded */}
        <RestTile row={1} col={13} c="H" v={4} muted />
        <RestTile row={2} col={13} c="M" v={3} muted />

        {/* MIKOLAJEK, already on the board */}
        {ACROSS.map(({ c, v, col }) =>
          col === DOWN_COL ? (
            // The shared A pulses when the down word connects through it.
            <motion.div
              key={`across-${col}`}
              className="absolute"
              style={cellStyle(ACROSS_ROW, col)}
              initial={false}
              animate={active && !reduced ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.4 }}
            >
              <Tile c={c} v={v} />
            </motion.div>
          ) : (
            <RestTile key={`across-${col}`} row={ACROSS_ROW} col={col} c={c} v={v} />
          )
        )}

        {/* Hover: PAWEL drops in, top to bottom */}
        {DOWN.map(({ c, v, row }, i) => (
          <div key={`down-${row}`} className="absolute" style={cellStyle(row, DOWN_COL)}>
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                reduced
                  ? { y: "0%", scale: 1, opacity: active ? 1 : 0 }
                  : {
                      y: active ? "0%" : "-110%",
                      scale: active ? 1 : 1.06,
                      opacity: active ? 1 : 0,
                    }
              }
              transition={
                reduced
                  ? { duration: 0.2 }
                  : active
                    ? {
                        ...TILE_SPRING,
                        delay: DROP_DELAY(i),
                        opacity: { duration: 0.14, delay: DROP_DELAY(i) },
                      }
                    : { duration: 0.18, ease: EASE_OUT }
              }
            >
              <Tile c={c} v={v} />
            </motion.div>
          </div>
        ))}

        {/* The move scores once the last tile lands */}
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{
            left: `${(9.3 / COLS) * 100}%`,
            top: `${(7.15 / ROWS) * 100}%`,
          }}
          initial={false}
          animate={
            reduced
              ? { opacity: active ? 1 : 0, scale: 1, y: 0 }
              : {
                  opacity: active ? 1 : 0,
                  scale: active ? 1 : 0.6,
                  y: active ? 0 : 6,
                }
          }
          transition={
            reduced
              ? { duration: 0.2 }
              : active
                ? { ...TILE_SPRING, delay: SCORE_DELAY, opacity: { duration: 0.15, delay: SCORE_DELAY } }
                : { duration: 0.15, ease: EASE_OUT }
          }
        >
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none"
            style={{
              background: INK,
              color: "#fcfbf8",
              boxShadow: "0 8px 16px -8px rgba(0,0,0,0.5)",
            }}
          >
            +10
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function RestTile({
  row,
  col,
  c,
  v,
  muted,
}: {
  row: number;
  col: number;
  c: string;
  v: number;
  muted?: boolean;
}) {
  return (
    <div className="absolute" style={cellStyle(row, col)}>
      <Tile c={c} v={v} muted={muted} />
    </div>
  );
}

function Tile({ c, v, muted }: { c: string; v: number; muted?: boolean }) {
  return (
    <div
      className="absolute"
      style={{
        inset: "5%",
        borderRadius: 5,
        background: muted ? "#f1efe9" : "#ffffff",
        opacity: muted ? 0.65 : 1,
        boxShadow: muted
          ? "0 0 0 1px rgba(0,0,0,0.06)"
          : "0 1px 0 rgba(255,255,255,0.6) inset, 0 6px 12px -6px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)",
      }}
    >
      {/* SVG so the lettering scales with the tile at any card size */}
      <svg viewBox="0 0 100 100" className="block h-full w-full">
        <text
          x="50"
          y="50"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="48"
          fontWeight="600"
          fill={INK}
        >
          {c}
        </text>
        <text
          x="80"
          y="84"
          textAnchor="middle"
          fontSize="20"
          fontWeight="600"
          fill="rgba(21,21,21,0.4)"
        >
          {v}
        </text>
      </svg>
    </div>
  );
}
