"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "@/components/Avatar";
import { clients } from "@/content/capabilities";
import { testimonials, type Testimonial } from "@/content/testimonials";

const quoteFor = (client: string): Testimonial | undefined =>
  testimonials.find((t) => t.company.startsWith(client));

type Active = { quote: Testimonial; x: number; y: number };

/**
 * Slow, seamless logo rail. Pauses on hover and shows a testimonial from
 * that client where there is one. Static and wrapped for reduced motion.
 */
export function ClientMarquee() {
  const row = [...clients, ...clients];
  const stage = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<Active | null>(null);

  const open = (e: React.PointerEvent<HTMLElement>, client: string) => {
    const quote = quoteFor(client);
    const box = stage.current?.getBoundingClientRect();
    if (!quote || !box) return setActive(null);
    const r = e.currentTarget.getBoundingClientRect();
    const half = 190 + 24;
    const x = Math.min(
      Math.max(r.left - box.left + r.width / 2, half),
      box.width - half,
    );
    setActive({ quote, x, y: r.top - box.top });
  };

  return (
    <div className="-mx-6 border-t hairline pb-20 pt-12 sm:-mx-10">
      <span className="block px-6 font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)] sm:px-10">
        Worked with
      </span>
      <p className="sr-only">{clients.map((c) => c.name).join(", ")}</p>

      <div ref={stage} className="relative mt-10">
        <div
          aria-hidden="true"
          data-hl={active ? "true" : "false"}
          className="marquee-mask overflow-hidden [&[data-hl=true]_img]:opacity-30 [&[data-hl=true]_li:hover_img]:opacity-100"
        >
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className={`flex shrink-0 items-center ${copy ? "marquee-dup" : ""}`}
              >
                {row.map((c, i) => (
                  <li
                    key={`${c.name}-${i}`}
                    className={`pr-14 sm:pr-24 ${i >= clients.length ? "marquee-dup" : ""}`}
                    onPointerEnter={(e) => open(e, c.name)}
                    onPointerLeave={() => setActive(null)}
                  >
                    <img
                      src={`/clients/${c.file}`}
                      alt=""
                      height={64}
                      className="client-logo h-10 w-auto opacity-70 transition-opacity duration-300 ease-out sm:h-14"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {active && (
            <motion.figure
              key={active.quote.name}
              aria-hidden="true"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute z-20 w-[min(380px,calc(100vw-48px))] -translate-x-1/2 -translate-y-full rounded-[var(--radius-card)] border border-[var(--hairline-strong)] bg-[var(--bg)] p-5"
              style={{ left: active.x, top: active.y - 14 }}
            >
              <blockquote className="line-clamp-6 text-[14px] leading-[1.55] text-[var(--fg)]">
                “{active.quote.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Avatar name={active.quote.name} src={active.quote.avatar} />
                <span className="flex flex-col">
                  <span className="text-[13px] text-[var(--fg)]">{active.quote.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
                    {active.quote.role} · {active.quote.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
