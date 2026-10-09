import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { dailyUi } from "@/content/daily-ui";
import { profile } from "@/content/profile";

export function DailyUi() {
  return (
    <section id="daily-ui" className="px-6 sm:px-10 py-28 sm:py-36 border-t hairline">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Daily UI" title="A shot a day." />
            <p className="max-w-[40ch] text-[var(--muted)]">
              The Daily UI challenge: a self-set brief each day, designed and
              shipped to Dribbble. Reps for the craft: typography, layout, and
              motion under a deadline.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {dailyUi.slice(0, -3).map((shot, i) => (
            <li
              key={`${shot.number}-${shot.src}`}
              className={i < 3 ? "col-span-2 sm:col-span-1 lg:col-span-2" : undefined}
            >
              <Reveal delay={(i < 3 ? i : (i - 3) % 6) * 0.06}>
                <a
                  href={shot.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden border hairline transition-colors duration-300 hover:border-[var(--fg)]"
                  style={{ borderRadius: "var(--radius-card)" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--hairline)]">
                    <img
                      src={shot.src}
                      alt={`${shot.label} — UI design shot`}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-white/90">
                      {shot.label}
                    </span>
                    <ArrowUpRight size={16} className="text-white/90" />
                  </div>
                  <span className="absolute left-3 top-3 font-mono text-[11px] tracking-[var(--tracking-eyebrow)] text-white/0 mix-blend-difference transition-colors duration-300 group-hover:text-white/80">
                    #{String(shot.number).padStart(2, "0")}
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <a
              href={profile.contact.dribbble}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              See the full set on Dribbble
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
