"use client";

import { Check, MessageSquare } from "lucide-react";

/** Brand reference becomes an answer grounded in the system's actual tokens. */
export function BrandGuidelinesThumb({ hovered }: { hovered: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ containerType: "inline-size", background: "#ff424a", color: "#131313", fontFamily: "var(--font-hanken), sans-serif" }}
    >
      <div className="absolute left-[9%] top-[8%] flex items-center gap-[1.4cqw] text-[2.2cqw] font-semibold tracking-[0.04em] text-white">
        <MessageSquare className="size-[3cqw]" strokeWidth={1.7} /> Human Made
      </div>
      <div className="absolute left-[9%] top-[13cqw] w-[82%] rounded-[2cqw] border border-black/10 bg-[#fbfafa] p-[4cqw] shadow-[0_3cqw_6cqw_-3cqw_rgba(80,8,15,0.45)]">
        <div className="flex items-center justify-between border-b border-[#e2dede] pb-[2.5cqw]">
          <span className="text-[3.2cqw] font-semibold tracking-[-0.02em]">Brand, in context.</span>
          <div className="flex -space-x-[0.8cqw]">
            {["#ff424a", "#131313", "#1f63c8"].map((color) => <span key={color} className="size-[4cqw] rounded-full border-[0.4cqw] border-[#fbfafa]" style={{ background: color }} />)}
          </div>
        </div>
        <div className="mt-[3cqw] ml-[8cqw] rounded-[1.5cqw_1.5cqw_0_1.5cqw] bg-[#ece9e9] px-[2.8cqw] py-[2.3cqw] text-[3cqw] leading-snug">
          Which colour for a primary button?
        </div>
        <div className="mt-[3cqw] flex items-start gap-[2cqw]">
          <div className="grid size-[5cqw] shrink-0 place-items-center rounded-[1.2cqw] bg-[#131313] text-[2cqw] font-semibold text-white">hm</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-[1.4cqw] text-[2.5cqw] font-semibold">
              human <span className="rounded bg-[#ece9e9] px-[0.9cqw] py-[0.2cqw] text-[1.8cqw] font-normal text-[#625b5b]">Brand skill</span>
            </div>
            <div className="mt-[1.5cqw] grid">
              <div className="col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:transition-none" style={{ opacity: hovered ? 0 : 1 }}>
                <p className="text-[2.6cqw] leading-snug text-[#625b5b]">The rules, ready for the task.</p>
                <div className="mt-[1.7cqw] flex gap-[1cqw] text-[1.9cqw] text-[#625b5b]">
                  {["Colour", "Type", "Voice"].map((label) => <span key={label} className="rounded-full border border-[#ded8d8] px-[1.6cqw] py-[0.5cqw]">{label}</span>)}
                </div>
              </div>
              <div className="col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:transition-none" style={{ opacity: hovered ? 1 : 0 }}>
                <p className="text-[2.6cqw] leading-snug">Use HM Button blue.</p>
                <div className="mt-[1.6cqw] flex items-center gap-[1.1cqw] text-[2cqw] text-[#625b5b]">
                  <span className="size-[2.6cqw] rounded-[0.6cqw] bg-[#1f63c8]" />
                  <span className="font-mono">#1F63C8</span>
                  <Check className="ml-auto size-[2.7cqw] text-[#24643a]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
