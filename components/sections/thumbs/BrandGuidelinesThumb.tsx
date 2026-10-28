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
      <div className="absolute left-[6cqw] top-[6cqw] flex items-center gap-[1.4cqw] text-[2.2cqw] font-semibold tracking-[0.04em] text-white">
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
          <div className="size-[5cqw] shrink-0 overflow-hidden rounded-[1.2cqw]">
            <svg viewBox="0 0 420 420" className="block size-full">
              <rect width="420" height="420" fill="#FF424A" />
              <path
                fill="#fff"
                d="M273.616 279.952C268.24 259.856 269.52 223.376 271.632 197.136C287.44 194.32 298.96 192.72 304.464 191.376C312.976 189.328 316.176 181.84 316.176 172.56C316.176 169.872 315.088 164.176 313.232 162.192C301.136 163.792 287.76 166.096 274.384 168.336C277.008 144.528 280.592 116.88 281.808 107.024C282.64 100.432 282 96.336 275.216 95.504C271.376 95.056 259.856 96.72 256.272 97.296C250.256 98.256 248.016 103.376 247.248 107.344C244.368 122.512 241.616 147.28 239.632 174.416C225.808 177.104 209.744 180.688 196.432 184.144C197.648 161.808 198.672 139.216 197.904 126.8C196.752 108.624 184.528 96.656 168.528 96.656C148.112 96.656 132.944 103.504 120.592 113.936C112.528 120.784 107.856 128.528 107.856 134.8C107.856 141.2 113.168 149.392 121.552 149.392C128.08 140.496 145.296 125.008 153.872 125.008C162.448 125.008 164.24 131.024 164.24 138.64C164.24 144.592 163.088 171.6 161.936 195.024C122 211.664 87.76 230.48 87.76 276.432C87.76 304.656 104.528 324.176 131.728 324.176C164.048 324.176 183.888 296.336 189.2 264.336C191.824 248.464 194.064 231.248 194.768 213.84C208.336 210.32 224.336 206.672 237.84 203.728C235.984 240.784 235.408 278.8 243.728 298.448C250.192 313.68 262.928 324.368 283.088 324.368C295.76 324.368 305.936 320.4 311.696 314.704C314.32 312.144 315.536 308.048 315.536 304.848C315.408 299.92 312.912 295.376 308.752 292.624C303.76 295.312 298.256 296.784 292.624 296.848C281.936 296.976 276.24 289.872 273.616 279.952ZM155.792 262.032C152.08 280.144 144.848 297.424 131.792 297.424C121.872 297.424 115.152 289.488 115.152 275.216C115.152 247.184 138.064 234.128 160.464 225.168C159.696 237.52 158.096 249.808 155.792 262.032Z"
              />
            </svg>
          </div>
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
