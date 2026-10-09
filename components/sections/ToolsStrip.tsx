import { Reveal } from "@/components/Reveal";
import { toolsStrip } from "@/content/capabilities";

export function ToolsStrip() {
  return (
    <section className="px-6 sm:px-10 py-20 border-t hairline">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
              Tools I reach for
            </span>
            <p className="font-display text-[clamp(1.25rem,2.4vw,1.9rem)] leading-[1.4] tracking-[var(--tracking-display)] [text-wrap:balance]">
              {toolsStrip.map((t, i) => (
                <span key={t} className="inline-block whitespace-nowrap">
                  <span>{t}</span>
                  {i < toolsStrip.length - 1 ? (
                    <span aria-hidden className="mx-3 text-[var(--muted)]">·</span>
                  ) : null}
                </span>
              ))}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
