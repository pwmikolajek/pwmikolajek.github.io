import * as React from "react";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  const w = size * (31 / 49);
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 31 49"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Paweł Mikołajek"
      role="img"
      className={cn("text-[var(--fg)]", className)}
    >
      <path d="M0 17.6421V42.1264L4.34429 44.6066L8.69051 42.1264V17.6421H0Z" />
      <path d="M22.3094 17.6421V42.1264L26.6556 44.6066L30.9999 42.1264V17.6421H22.3094Z" />
      <path d="M11.1548 29.8921V46.5198L15.501 49L19.8453 46.5198V29.8921L15.501 32.3723L11.1548 29.8921Z" />
      <path d="M11.1548 0V26.9331L15.501 29.4133L19.8453 26.9331V15.1403H26.6557L31 7.57016L26.6557 0L11.1548 0Z" />
    </svg>
  );
}
