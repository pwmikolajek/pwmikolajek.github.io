import { SectionHeading } from "@/components/SectionHeading";
import { Avatar } from "@/components/Avatar";
import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section id="kind-words" className="px-6 sm:px-10 py-28 sm:py-36 border-t hairline">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading eyebrow="Kind words" title="People I’ve worked with." />
        </Reveal>

        <div className="mt-14 grid gap-px border-t border-l hairline md:grid-cols-2 bg-[var(--hairline)]">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.06} className="bg-[var(--bg)]">
              <figure className="flex h-full flex-col gap-6 border-r border-b hairline p-8 sm:p-10">
                <span aria-hidden className="font-display text-5xl leading-none text-[var(--hairline-strong)]">
                  “
                </span>
                <blockquote className="text-[16.5px] leading-[1.6] text-[var(--fg)]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-4">
                  <Avatar name={t.name} src={t.avatar} />
                  <span className="flex flex-col">
                    <span className="text-[14px] text-[var(--fg)]">{t.name}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
