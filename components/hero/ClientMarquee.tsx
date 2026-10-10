"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { clients } from "@/content/capabilities";
import { testimonials, type Testimonial } from "@/content/testimonials";

const quoteFor = (client: string): Testimonial | undefined =>
  testimonials.find((t) => t.company.startsWith(client));

const MANUAL_RAIL = "(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)";

/** Automatic on desktop; manually scrollable on touch devices or with reduced motion. */
export function ClientMarquee() {
  const [manualRail, setManualRail] = React.useState(false);
  React.useEffect(() => {
    const preference = window.matchMedia(MANUAL_RAIL);
    const update = () => setManualRail(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const row = [...clients, ...clients];
  const [active, setActive] = React.useState<Testimonial | null>(null);
  const stage = React.useRef<HTMLDivElement>(null);
  const gesture = React.useRef({ x: 0, y: 0, moved: false });
  const testimonialId = React.useId();

  // Keep taps distinct from a swipe, without intercepting native scrolling.
  const trackGesture = (event: React.PointerEvent) => {
    if (Math.abs(event.clientX - gesture.current.x) > 8 || Math.abs(event.clientY - gesture.current.y) > 8) {
      gesture.current.moved = true;
    }
  };

  React.useEffect(() => {
    if (!active) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!stage.current?.contains(event.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [active]);

  return (
    <div className="-mx-6 border-t hairline pb-20 pt-12 sm:-mx-10">
      <span className="block px-6 font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)] sm:px-10">
        Worked with
      </span>

      <div
        ref={stage}
        className="relative mt-10"
        onKeyDown={(event) => {
          if (event.key === "Escape") setActive(null);
        }}
      >
        <div
          role="region"
          aria-label="Client logos"
          tabIndex={manualRail ? 0 : undefined}
          onKeyDown={(event) => {
            if (!manualRail) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              event.currentTarget.scrollLeft += event.key === "ArrowRight" ? 160 : -160;
            }
          }}
          onPointerDown={(event) => {
            gesture.current = { x: event.clientX, y: event.clientY, moved: false };
          }}
          onPointerMove={trackGesture}
          onPointerUp={trackGesture}
          onPointerCancel={() => { gesture.current.moved = true; }}
          data-paused={active ? "true" : "false"}
          className="marquee-mask overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--fg)]"
        >
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className={`flex shrink-0 items-center ${copy ? "marquee-dup" : ""}`}
              >
                {row.map((client, index) => {
                  const duplicate = copy > 0 || index >= clients.length;
                  const quote = quoteFor(client.name);
                  const logo = (
                    <img
                      src={`/clients/${client.file}`}
                      alt={quote || duplicate ? "" : client.name}
                      height={64}
                      className="client-logo h-10 w-auto opacity-70 transition-opacity duration-300 ease-out sm:h-14"
                    />
                  );
                  return (
                    <li
                      key={`${client.name}-${index}`}
                      aria-hidden={duplicate || undefined}
                      className={`pr-14 sm:pr-24 ${index >= clients.length ? "marquee-dup" : ""}`}
                    >
                      {quote ? (
                        <button
                          type="button"
                          tabIndex={duplicate ? -1 : undefined}
                          aria-label={`Read testimonial from ${client.name}`}
                          aria-expanded={active?.name === quote.name}
                          aria-controls={testimonialId}
                          className="flex min-h-11 items-center rounded-sm py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--fg)] [&:hover_img]:opacity-100 [&[aria-expanded=true]_img]:opacity-100"
                          onClick={(event) => {
                            if (event.detail > 0 && gesture.current.moved) return;
                            setActive((current) => current?.name === quote.name ? null : quote);
                          }}
                        >
                          {logo}
                        </button>
                      ) : logo}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>

        <div id={testimonialId} aria-live="polite" aria-atomic="true">
            {active && (
              <figure
                className="relative mx-6 mt-6 max-w-[560px] rounded-[var(--radius-card)] border border-[var(--hairline-strong)] bg-[var(--bg)] p-5 sm:mx-10"
              >
                <button
                  type="button"
                  aria-label="Close testimonial"
                  onClick={() => setActive(null)}
                  className="absolute right-1 top-1 grid size-11 place-items-center rounded-md text-[var(--muted)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-[var(--fg)]"
                >
                  <X size={16} aria-hidden="true" />
                </button>
                <blockquote className="pr-6 text-[14px] leading-[1.55] text-[var(--fg)]">
                  “{active.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <Avatar name={active.name} src={active.avatar} />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[13px] text-[var(--fg)]">{active.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
                      {active.role} · {active.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            )}
        </div>
      </div>
    </div>
  );
}
