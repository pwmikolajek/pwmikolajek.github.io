"use client";

import { ArrowUpRight, Check, FileText, Link2 } from "lucide-react";

/** A compact version of the room's draft-to-published interaction. */
export function DealRoomThumb({ hovered }: { hovered: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ containerType: "inline-size", background: "#dce5ed", color: "#17212d", fontFamily: "var(--font-hanken), sans-serif" }}
    >
      <div className="absolute left-[7%] top-[7%] flex items-center gap-[1.4cqw] text-[2.2cqw] font-semibold tracking-[0.04em]">
        <Link2 className="size-[3cqw]" strokeWidth={1.7} />
        Deal Room
      </div>

      <div
        className="relative mt-[6%] w-[80%] rounded-[2cqw] border border-black/10 bg-[#fafafa] p-[5cqw] shadow-[0_3cqw_6cqw_-3cqw_rgba(26,49,73,0.35)] transition-transform duration-300 motion-reduce:transition-none"
        style={{ transform: hovered ? "translateY(-1cqw)" : "translateY(0)" }}
      >
        <div className="flex items-center gap-[2cqw]">
          <div className="grid size-[7cqw] shrink-0 place-items-center rounded-[1.6cqw] bg-[#203e61] text-[2.7cqw] font-bold text-white">HP</div>
          <div>
            <div className="text-[3.6cqw] font-semibold leading-tight">Harbour Press</div>
            <div className="mt-[0.5cqw] text-[2.1cqw] text-[#596675]">with Human Made</div>
          </div>
          <ArrowUpRight className="ml-auto size-[3.5cqw] text-[#596675]" strokeWidth={1.5} />
        </div>

        <div className="mt-[4cqw] flex items-center gap-[2cqw] rounded-[1.4cqw] border border-[#dce1e7] bg-white p-[2.7cqw]">
          <FileText className="size-[5cqw] shrink-0 text-[#245ab5]" strokeWidth={1.4} />
          <div className="min-w-0 flex-1">
            <div className="text-[2.8cqw] font-semibold leading-tight">Project proposal</div>
            <div className="mt-[0.7cqw] text-[2.1cqw] text-[#596675]">{hovered ? "Latest version · same link" : "Ready for client review"}</div>
          </div>
          <span
            className="flex items-center gap-[0.7cqw] rounded-full px-[1.8cqw] py-[0.8cqw] text-[2cqw] font-semibold"
            style={{ background: hovered ? "#e4f3e9" : "#edf0f4", color: hovered ? "#24643a" : "#536171" }}
          >
            {hovered && <Check className="size-[2.2cqw]" />}
            {hovered ? "Published" : "Draft"}
          </span>
        </div>

        <div className="mt-[3cqw] flex items-center justify-between gap-[2cqw] border-t border-[#dce1e7] pt-[3cqw]">
          <div>
            <div className="text-[2.1cqw] text-[#596675]">Next step</div>
            <div className="mt-[0.6cqw] text-[2.7cqw] font-semibold">Review the proposal</div>
          </div>
          <span className="flex items-center gap-[1cqw] rounded-[1cqw] bg-[#245ab5] px-[2.3cqw] py-[1.5cqw] text-[2.2cqw] font-semibold text-white">
            {hovered ? <><Check className="size-[2.7cqw]" /> Published</> : <>Publish <ArrowUpRight className="size-[2.7cqw]" /></>}
          </span>
        </div>
      </div>
    </div>
  );
}
