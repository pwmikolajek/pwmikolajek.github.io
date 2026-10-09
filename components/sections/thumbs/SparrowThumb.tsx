"use client";

import { Check, MessageSquare, MoreHorizontal } from "lucide-react";

/** A document, a pin, and a review that can be resolved in place. */
export function SparrowThumb({ hovered }: { hovered: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
      style={{ containerType: "inline-size", background: "#1f63c8", color: "#182336", fontFamily: "var(--font-hanken), sans-serif" }}
    >
      <div className="absolute left-[7%] top-[7%] flex items-center gap-[1.4cqw] text-[2.2cqw] font-semibold tracking-[0.04em] text-white">
        <MessageSquare className="size-[3cqw]" strokeWidth={1.7} /> Sparrow
      </div>

      <div className="absolute left-[9%] top-[20%] h-[91%] w-[58%] -rotate-6 rounded-[0.7cqw] bg-white p-[5cqw] shadow-[0_3cqw_6cqw_rgba(10,37,80,0.25)]">
        <div className="flex items-center justify-between border-b border-[#dce1e7] pb-[2cqw] text-[1.6cqw] font-semibold uppercase tracking-[0.12em] text-[#607087]">
          <span>Project briefing</span><span>v2</span>
        </div>
        <div className="mt-[5cqw] text-[5.5cqw] font-semibold leading-[1.08] tracking-[-0.04em]">
          Good work.<br />Clear feedback.
        </div>
        <div className="mt-[4cqw] space-y-[1.2cqw]">
          {["92%", "84%", "66%"].map((width) => (
            <div key={width} className="h-[0.8cqw] rounded-full bg-[#dce1e7]" style={{ width }} />
          ))}
        </div>
        <div className="mt-[4cqw] border-l-[0.6cqw] border-[#1f63c8] bg-[#edf2f8] p-[2.5cqw]">
          <div className="text-[2cqw] font-semibold">For review</div>
          <div className="mt-[1.3cqw] h-[0.8cqw] w-[80%] rounded-full bg-[#c2cfdf]" />
          <div className="mt-[1.1cqw] h-[0.8cqw] w-[60%] rounded-full bg-[#c2cfdf]" />
        </div>
      </div>

      <div className="absolute left-[47%] top-[40%] z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          className="grid size-[6cqw] -rotate-45 place-items-center rounded-[50%_50%_50%_0] border-[0.4cqw] border-white shadow-[0_0.5cqw_2cqw_rgba(10,37,80,0.25)]"
          style={{ background: hovered ? "#fff" : "#1f63c8", color: hovered ? "#1f63c8" : "#fff" }}
        >
          <span className="rotate-45 text-[2.7cqw] font-semibold">1</span>
        </div>
      </div>

      <div
        className="absolute left-[51%] top-[31%] w-[43%] rounded-[2cqw] border border-black/10 bg-[#fbfafa] p-[3cqw] shadow-[0_2cqw_5cqw_rgba(10,37,80,0.25)] transition-transform duration-200 motion-reduce:transition-none"
        style={{ transform: hovered ? "translateY(-0.8cqw)" : "translateY(0)" }}
      >
        <div className="flex items-center gap-[1.5cqw]">
          <span className="grid size-[4.8cqw] place-items-center rounded-full bg-[#e2e8f0] text-[2cqw] font-semibold">A</span>
          <span className="text-[2.6cqw] font-semibold">Alex Morgan</span>
          <MoreHorizontal className="ml-auto size-[3cqw] text-[#607087]" />
        </div>
        <p className="mt-[2.5cqw] text-[3cqw] leading-[1.4]">Could we make the opening more direct?</p>
        <div className="mt-[3cqw] flex items-center justify-between gap-[1cqw] border-t border-[#dce1e7] pt-[2.3cqw]">
          <span className="text-[2cqw] text-[#607087]">Page 1</span>
          <span
            className="flex items-center gap-[0.7cqw] rounded-full border px-[1.8cqw] py-[0.8cqw] text-[2.1cqw] font-semibold"
            style={{ borderColor: hovered ? "#cce2d3" : "#1f63c8", color: hovered ? "#24643a" : "#1f63c8", background: hovered ? "#e4f3e9" : "#fff" }}
          >
            {hovered && <Check className="size-[2.5cqw]" />}
            {hovered ? "Resolved" : "Resolve"}
          </span>
        </div>
      </div>
    </div>
  );
}
