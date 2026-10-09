"use client";

import { Grid2X2, Timer, Users } from "lucide-react";

const PLAYED = [
  { letter: "C", value: 3, row: 2, col: 1 },
  { letter: "L", value: 1, row: 2, col: 2 },
  { letter: "A", value: 1, row: 2, col: 3 },
  { letter: "S", value: 1, row: 2, col: 4 },
  { letter: "H", value: 4, row: 2, col: 5 },
];
const MOVE = [
  { letter: "P", value: 3, row: 1, col: 3 },
  { letter: "W", value: 4, row: 3, col: 3 },
];

/** A cropped game board with an opponent's move arriving as live ghost tiles. */
export function LetterClashThumb({ hovered }: { hovered: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
      style={{ containerType: "inline-size", background: "#e6bc79", color: "#30291f", fontFamily: "var(--font-hanken), sans-serif" }}
    >
      <div className="absolute left-[7%] top-[7%] flex items-center gap-[1.4cqw] text-[2.2cqw] font-semibold tracking-[0.04em]">
        <Grid2X2 className="size-[3cqw]" strokeWidth={1.7} /> Letter Clash
      </div>

      <div className="absolute left-[9%] top-[13cqw] w-[82%] rounded-[2cqw] border border-black/10 bg-[#fcfbf8] p-[3cqw] shadow-[0_3cqw_6cqw_-3cqw_rgba(83,54,20,0.4)]">
        <div className="flex items-center justify-between gap-[2cqw]">
          <div className="flex items-center gap-[1.5cqw]">
            <span className="grid size-[5cqw] place-items-center rounded-full bg-[#e8dcc6] text-[2.2cqw] font-semibold">M</span>
            <div>
              <div className="text-[2.7cqw] font-semibold leading-tight">Maya’s turn</div>
              <div className="mt-[0.4cqw] text-[1.9cqw] text-[#796b55]">Live multiplayer</div>
            </div>
          </div>
          <span className="flex items-center gap-[0.8cqw] rounded-full bg-[#e5eedf] px-[1.6cqw] py-[0.8cqw] text-[2.2cqw] font-semibold text-[#46603d]">
            <Timer className="size-[2.6cqw]" strokeWidth={1.7} /> 20s
          </span>
        </div>

        <div className="relative mt-[2.5cqw] grid grid-cols-7 gap-[0.5cqw] rounded-[1cqw] bg-[#e3dfd5] p-[0.6cqw]">
          {Array.from({ length: 35 }, (_, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const played = PLAYED.find((tile) => tile.row === row && tile.col === col);
            const move = MOVE.find((tile) => tile.row === row && tile.col === col);
            const tile = played ?? (hovered ? move : undefined);
            return (
              <div
                key={i}
                className="relative flex h-[5.4cqw] items-center justify-center rounded-[0.5cqw]"
                style={{
                  background: tile ? (move ? "#e3ead8" : "#fffdf6") : "#f1eee6",
                  boxShadow: played ? "0 0.4cqw 0 #cfc5b2, 0 0 0 1px #d6ccba" : undefined,
                  outline: tile && move ? "1px dashed #8a9b75" : undefined,
                }}
              >
                {tile && <>
                  <span className="text-[3.2cqw] font-semibold leading-none" style={{ color: move ? "#7b8c67" : "#30291f" }}>{tile.letter}</span>
                  <span className="absolute bottom-[0.4cqw] right-[0.6cqw] text-[1.2cqw] font-semibold text-[#8b806d]">{tile.value}</span>
                </>}
              </div>
            );
          })}
        </div>

        <div className="mt-[2.3cqw] flex items-center justify-between gap-[1cqw] text-[2cqw]">
          <span className="flex items-center gap-[0.9cqw] text-[#796b55]"><Users className="size-[2.5cqw]" strokeWidth={1.7} /> {hovered ? "Maya is placing tiles…" : "Two players. One board."}</span>
          <span className="font-semibold">Maya 42 <span className="mx-[0.6cqw] text-[#b0a592]">:</span> Tom 38</span>
        </div>
      </div>
    </div>
  );
}
