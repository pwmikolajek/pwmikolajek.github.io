import { Reveal } from "@/components/Reveal";
import type { Shot } from "@/content/case-studies/_types";

export function CaseStudyShots({ shots }: { shots: Shot[] }) {
  if (shots.length === 0) return null;
  return (
    <section className="space-y-12 sm:space-y-20 pb-24 sm:pb-32">
      {shots.map((shot, i) => (
        <Reveal key={shot.src} delay={i * 0.02}>
          <figure className="flex flex-col gap-4">
            <div
              className="overflow-hidden border hairline bg-[var(--hairline)]"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
            {shot.caption ? (
              <figcaption className="mx-auto max-w-[68ch] text-[14.5px] leading-relaxed text-[var(--muted)]">
                {shot.caption}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      ))}
    </section>
  );
}
