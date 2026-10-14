import { Reveal } from "@/components/Reveal";
import type { CaseStudy } from "@/content/case-studies/_types";

export function CaseStudyProse({ summary, sections }: Pick<CaseStudy, "summary" | "sections">) {
  return (
    <section aria-label="Full case study" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[68ch] space-y-14">
        <Reveal>
          <p className="font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-[var(--fg)]">
            {summary}
          </p>
        </Reveal>
        {sections.map((section) => (
          <div key={section.title} className="space-y-6">
            <Reveal>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-[var(--tracking-display)]">
                {section.title}
              </h2>
            </Reveal>
            {section.paragraphs.map((paragraph, index) => (
              <Reveal key={index}>
                <p
                  className="text-[17px] leading-[1.7] text-[var(--fg)]"
                  dangerouslySetInnerHTML={{ __html: renderInline(paragraph) }}
                />
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function renderInline(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-medium text-[var(--fg)]">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="font-mono text-[14.5px] text-[var(--fg)]">$1</code>');
}
