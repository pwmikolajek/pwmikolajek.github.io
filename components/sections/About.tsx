import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="px-6 sm:px-10 py-28 sm:py-36 border-t hairline">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[300px_1fr] lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow="About" title={<span>Design,<br />motion, and<br />the front-end.</span>} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-[60ch] space-y-6 text-[1.0625rem] leading-[1.65] text-[var(--fg)]">
            {profile.about.map((p, i) => (
              <p key={i} className={i > 0 ? "text-[var(--muted)]" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
