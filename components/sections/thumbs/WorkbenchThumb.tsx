"use client";

import * as React from "react";
import { Check } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const WEEKS = [
  [26, 27, 28, 29, 30],
  [2, 3, 4, 5, 6],
];
const WEEK_H = 19.5; // cqw, short enough that the date and a chip both fit in the part of week two the card shows
// cqw inside its week: below the campaign bars in the first week, below the date in the second
const CHIP_TOP = [12.4, 5];

/** A slice of the month calendar. The "Teaser 2" task can be dragged onto any day, as in the real thing. */
export function WorkbenchThumb({ hovered }: { hovered: boolean }) {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [cell, setCell] = React.useState({ row: 0, col: 3 });
  const [drag, setDrag] = React.useState<{ x: number; y: number } | null>(null);
  const start = React.useRef<{ x: number; y: number; moved: boolean } | null>(null);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    // Stops the card's link from starting a native drag, which would cancel this one mid-move.
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, moved: false };
    setDrag({ x: 0, y: 0 });
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!start.current) return;
    const x = e.clientX - start.current.x;
    const y = e.clientY - start.current.y;
    if (Math.abs(x) > 3 || Math.abs(y) > 3) start.current.moved = true;
    setDrag({ x, y });
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const grid = gridRef.current?.getBoundingClientRect();
    if (grid && start.current?.moved) {
      const col = Math.floor(((e.clientX - grid.left) / grid.width) * DAYS.length);
      const row = Math.floor(((e.clientY - grid.top) / grid.height) * WEEKS.length);
      setCell({
        col: Math.min(DAYS.length - 1, Math.max(0, col)),
        row: Math.min(WEEKS.length - 1, Math.max(0, row)),
      });
    }
    setDrag(null);
  }
  // A drag that ends on the card must not open the case study; a plain click still does.
  function onClick(e: React.MouseEvent) {
    if (start.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
    start.current = null;
  }

  const dragging = drag !== null;
  const lifted = dragging || hovered;

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
      style={{ containerType: "inline-size", background: "#131313", color: "#131313", fontFamily: "var(--font-hanken), sans-serif" }}
    >
      <div className="absolute left-[6cqw] top-[6cqw] flex items-center gap-[1.4cqw] text-[2.2cqw] font-semibold tracking-[0.04em] text-white">
        <span className="grid size-[3cqw] place-items-center rounded-[0.6cqw] bg-[#ff424a]">
          <Check className="size-[2cqw] text-white" strokeWidth={3} />
        </span>
        Workbench
      </div>

      <div className="absolute left-[9%] top-[13cqw] h-[90%] w-[96%] rounded-[1.6cqw] border border-white/10 bg-[#fbfafa] shadow-[0_3cqw_6cqw_-3cqw_rgba(0,0,0,0.6)]">
        <div className="flex items-baseline justify-between px-[4cqw] pt-[3.4cqw]">
          <span className="text-[4.2cqw] font-semibold tracking-[-0.03em]">October</span>
          <span className="rounded-full border border-[#d7d3d3] px-[1.8cqw] py-[0.6cqw] text-[1.9cqw] font-medium text-[#373534]">Today</span>
        </div>

        <div className="mt-[2.6cqw] grid grid-cols-5 border-t border-[#e8e5e5] text-[1.8cqw] text-[#767271]">
          {DAYS.map((d) => (
            <div key={d} className="border-r border-[#e8e5e5] px-[1.6cqw] py-[1cqw] last:border-r-0">{d}</div>
          ))}
        </div>

        <div ref={gridRef} className="relative">
          {WEEKS.map((week, w) => (
            <div key={w} className="relative grid grid-cols-5 border-t border-[#e8e5e5]" style={{ height: `${WEEK_H}cqw` }}>
              {week.map((n) => (
                <div
                  key={n}
                  className="border-r border-[#e8e5e5] px-[1.6cqw] pt-[1.2cqw] text-[2cqw] last:border-r-0"
                  style={n === 28 ? { background: "#eef3fb" } : undefined}
                >
                  {n === 28 ? (
                    <span className="grid size-[3.6cqw] place-items-center rounded-full bg-[#131313] text-[1.9cqw] font-semibold text-white">28</span>
                  ) : (
                    <span className="text-[#585454]">{n}</span>
                  )}
                </div>
              ))}

              {w === 0 && (
                <>
                  <div className="absolute left-[1.2cqw] right-[21%] top-[6.4cqw] h-[2.4cqw] rounded-[0.5cqw] border border-[#f4a3b0] bg-[#fde3e8] px-[1.2cqw] text-[1.6cqw] leading-[2.2cqw] text-[#7a1f33]">
                    State of Content report: launch
                  </div>
                  <div className="absolute left-[41%] right-[1.2cqw] top-[9.4cqw] h-[2.4cqw] rounded-[0.5cqw] border border-[#9fd8b6] bg-[#dff5e7] px-[1.2cqw] text-[1.6cqw] leading-[2.2cqw] text-[#1f5c38]">
                    Founder series
                  </div>
                  <div className="absolute left-[21%] top-[12.8cqw] flex w-[19%] items-start gap-[0.8cqw] px-[1.6cqw] text-[1.7cqw] leading-[1.25] text-[#373534]">
                    <span className="mt-[0.5cqw] size-[1.2cqw] shrink-0 rounded-full bg-[#4667de]" />
                    Ferrybank case study: sign-off
                  </div>
                </>
              )}
            </div>
          ))}

          {/* The task you can move. It snaps into whichever day it is dropped on. */}
          <div
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              start.current = null;
              setDrag(null);
            }}
            onClick={onClick}
            className="absolute w-[19%] select-none rounded-[0.8cqw] border bg-white px-[1.4cqw] py-[1cqw] text-[1.7cqw] leading-[1.25] text-[#131313] motion-reduce:transition-none"
            style={{
              left: `calc(${cell.col * 20}% + 0.5%)`,
              top: `${cell.row * WEEK_H + CHIP_TOP[cell.row]}cqw`,
              transform: dragging
                ? `translate(${drag.x}px, ${drag.y}px) rotate(-1.5deg) scale(1.04)`
                : hovered
                  ? "translateY(-0.6cqw)"
                  : "none",
              transition: dragging ? "box-shadow 150ms" : "left 300ms ease-out, top 300ms ease-out, transform 300ms ease-out, box-shadow 300ms",
              borderColor: lifted ? "#1f63c8" : "#e8e5e5",
              boxShadow: lifted ? "0 1.6cqw 3cqw -1cqw rgba(19,19,19,0.35)" : "0 0.3cqw 0.8cqw rgba(19,19,19,0.06)",
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "none",
              zIndex: 2,
            }}
          >
            <span className="flex items-start gap-[0.8cqw]">
              <span className="mt-[0.5cqw] size-[1.2cqw] shrink-0 rounded-full bg-[#ff424a]" />
              Teaser 2: the top quartile
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
