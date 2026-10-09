import { Reveal } from "@/components/Reveal";

export function CaseStudyProse({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[68ch] space-y-6">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <p
              className="text-[17px] leading-[1.7] text-[var(--fg)]"
              dangerouslySetInnerHTML={{ __html: renderInline(p) }}
            />
          </Reveal>
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
