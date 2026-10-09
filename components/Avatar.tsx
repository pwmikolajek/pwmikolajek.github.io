import { cn } from "@/lib/cn";

/** Greyscale portrait, or an initials circle when there is no photo. */
export function Avatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const base = "h-11 w-11 shrink-0 rounded-full border hairline";
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={72}
        height={72}
        className={cn(base, "object-cover grayscale", className)}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        base,
        "inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((p) => /^[A-Za-zÀ-ž]/.test(p))
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
