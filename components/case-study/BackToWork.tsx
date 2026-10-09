import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToWork() {
  return (
    <div className="border-t hairline pt-10 pb-20">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Back to selected work
      </Link>
    </div>
  );
}
