"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { clients } from "@/content/capabilities";
import { testimonials, type Testimonial } from "@/content/testimonials";

const quoteFor = (client: string): Testimonial | undefined =>
  testimonials.find((t) => t.company.startsWith(client));

const MANUAL_RAIL = "(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)";
const DESKTOP_HOVER = "(hover: hover) and (pointer: fine)";
type Hovered = { quote: Testimonial; x: number; y: number };

/** Automatic on desktop; manually scrollable on touch devices or with reduced motion. */
export function ClientMarquee() {
  const [manualRail, setManualRail] = React.useState(false);
  const [desktopHover, setDesktopHover] = React.useState(false);
  const [hovered, setHovered] = React.useState<Hovered | null>(null);
  React.useEffect(() => {
    const preference = window.matchMedia(MANUAL_RAIL);
    const desktop = window.matchMedia(DESKTOP_HOVER);
    const update = () => {
      setManualRail(preference.matches);
      setDesktopHover(desktop.matches);
      if (desktop.matches) setActive(null);
      else setHovered(null);
    };
    update();
    preference.addEventListener("change", update);
    desktop.addEventListener("change", update);
    return () => {
      preference.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  const row = [...clients, ...clients];
  const [active, setActive] = React.useState<Testimonial | null>(null);
  const stage = React.useRef<HTMLDivElement>(null);
  const gesture = React.useRef({ x: 0, y: 0, moved: false });
  const testimonialId = React.useId();

  const openHover = (element: HTMLElement, client: string) => {
    if (!desktopHover) return;
    const quote = quoteFor(client);
    const box = stage.current?.getBoundingClientRect();
    if (!quote || !box) return setHovered(null);
    const logo = (element.closest("li") ?? element).getBoundingClientRect();
    const half = Math.min(380, box.width - 48) / 2;
    const x = Math.min(Math.max(logo.left - box.left + logo.width / 2, half + 24), box.width - half - 24);
    setHovered({ quote, x, y: logo.top - box.top });
  };

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
          if (event.key === "Escape") {
            setActive(null);
            setHovered(null);
          }
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
          data-paused={active || hovered ? "true" : "false"}
          data-hl={desktopHover && hovered ? "true" : "false"}
          className="marquee-mask overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--fg)] [&[data-hl=true]_img]:opacity-30 [&[data-hl=true]_li:hover_img]:opacity-100 [&[data-hl=true]_li:focus-within_img]:opacity-100"
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
                      onPointerEnter={(event) => {
                        if (event.pointerType === "mouse") openHover(event.currentTarget, client.name);
                      }}
                      onPointerLeave={(event) => {
                        if (desktopHover && event.pointerType === "mouse") setHovered(null);
                      }}
                    >
                      {quote ? (
                        <button
                          type="button"
                          tabIndex={duplicate ? -1 : undefined}
                          aria-label={`Read testimonial from ${client.name}`}
                          aria-expanded={(desktopHover ? hovered?.quote.name : active?.name) === quote.name}
                          aria-controls={testimonialId}
                          className="flex min-h-11 items-center rounded-sm py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--fg)] [&:hover_img]:opacity-100 [&[aria-expanded=true]_img]:opacity-100"
                          onClick={(event) => {
                            if (desktopHover) return;
                            if (event.detail > 0 && gesture.current.moved) return;
                            setActive((current) => current?.name === quote.name ? null : quote);
                          }}
                          onFocus={(event) => openHover(event.currentTarget, client.name)}
                          onBlur={() => { if (desktopHover) setHovered(null); }}
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
            {!desktopHover && active && (
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
          <AnimatePresence>
            {desktopHover && hovered && (
              <motion.figure
                key={hovered.quote.name}
                aria-hidden="true"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute z-20 w-[min(380px,calc(100vw-48px))] -translate-x-1/2 -translate-y-full rounded-[var(--radius-card)] border border-[var(--hairline-strong)] bg-[var(--bg)] p-5"
                style={{ left: hovered.x, top: hovered.y - 14 }}
              >
                <blockquote className="line-clamp-6 text-[14px] leading-[1.55] text-[var(--fg)]">
                  “{hovered.quote.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <Avatar name={hovered.quote.name} src={hovered.quote.avatar} />
                  <span className="flex flex-col">
                    <span className="text-[13px] text-[var(--fg)]">{hovered.quote.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
                      {hovered.quote.role} · {hovered.quote.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
