import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="px-6 sm:px-10 py-28 sm:py-36 border-t hairline">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Where I’ve worked." />
        </Reveal>

        <ol className="mt-14 divide-y hairline border-t border-b hairline">
          {experience.map((role, i) => (
            <Reveal key={role.title + role.company} delay={i * 0.06}>
              <li className="grid gap-6 py-10 md:grid-cols-[200px_1fr] md:gap-12">
                <div className="font-mono text-[12px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)] font-tnum">
                  <div>{role.from}</div>
                  <div className="text-[var(--hairline-strong)]">↓</div>
                  <div>{role.to}</div>
                </div>
                <div className="space-y-4">
                  <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-[1.5rem] leading-tight tracking-[var(--tracking-display)]">
                      {role.title}
                    </h3>
                    <span className="text-[var(--muted)]">— {role.company}, {role.location}</span>
                  </header>
                  <ul className="space-y-2 text-[var(--fg)]">
                    {role.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-[15.5px] leading-relaxed">
                        <span aria-hidden className="mt-[0.7em] block h-px w-3 shrink-0 bg-[var(--muted)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
