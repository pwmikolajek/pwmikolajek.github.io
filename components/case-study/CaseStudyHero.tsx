import { Reveal } from "@/components/Reveal";
import type { CaseStudy } from "@/content/case-studies/_types";

export function CaseStudyHero({ hero, summary }: { hero: CaseStudy["hero"]; summary: string }) {
  return (
    <header className="flex flex-col gap-8 pt-20 sm:pt-28 pb-14 sm:pb-20 border-b hairline">
      <Reveal>
        <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
          {hero.eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-[var(--tracking-display)]">
          {hero.title}
        </h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="max-w-[60ch] font-display text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug text-[var(--fg)]">
          {summary}
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 border-t hairline pt-6 sm:grid-cols-4">
          <Meta label="Role">{hero.role}</Meta>
          <Meta label="Year">{hero.year}</Meta>
          <Meta label="Stack" colSpan="md">
            {hero.stack.join(" · ")}
          </Meta>
          {hero.live ? (
            <Meta label="Live">
              <a href={hero.live.href} target="_blank" rel="noreferrer" className="link [overflow-wrap:anywhere]">
                {hero.live.label} ↗
              </a>
            </Meta>
          ) : null}
        </dl>
      </Reveal>
    </header>
  );
}

function Meta({
  label,
  children,
  colSpan,
}: {
  label: string;
  children: React.ReactNode;
  colSpan?: "md";
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 ${colSpan === "md" ? "sm:col-span-2" : ""}`}>
      <dt className="font-mono text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
        {label}
      </dt>
      <dd className="text-[14.5px] text-[var(--fg)]">{children}</dd>
    </div>
  );
}
