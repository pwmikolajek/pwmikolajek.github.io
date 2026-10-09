import * as React from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
        {eyebrow}
      </span>
      {title ? (
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.04] tracking-[var(--tracking-display)] text-[var(--fg)]">
          {title}
        </h2>
      ) : null}
    </div>
  );
}
