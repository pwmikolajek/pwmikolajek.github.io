import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]",
        "border hairline rounded-full px-2 py-[3px]",
        className,
      )}
      {...props}
    />
  );
}
