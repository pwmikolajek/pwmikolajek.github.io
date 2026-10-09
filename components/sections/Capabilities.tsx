import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DesignArt, MotionArt, FrontendArt } from "@/components/sections/CapabilityArt";
import { capabilities } from "@/content/capabilities";

const ART = [DesignArt, MotionArt, FrontendArt];

export function Capabilities() {
  return (
    <section id="capabilities" className="px-6 sm:px-10 py-28 sm:py-36 border-t hairline">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionHeading eyebrow="Capabilities" title="What I bring to a team." />
        </Reveal>

        <div className="mt-16 grid border-t border-l hairline md:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Art = ART[i];
            return (
            <Reveal key={cap.title} delay={i * 0.08} className="bg-[var(--bg)]">
              <div className="flex h-full flex-col gap-6 border-r border-b hairline p-8 sm:p-10">
                {Art && <Art />}
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.75rem] leading-tight tracking-[var(--tracking-display)]">
                    {cap.title}
                  </h3>
                </div>
                <p className="max-w-[36ch] text-[var(--muted)] leading-relaxed">
                  {cap.description}
                </p>
                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[12px] text-[var(--fg)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
