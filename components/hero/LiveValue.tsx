"use client";

import * as React from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { formatEm } from "./useHeroEdit";

/** Renders a motion value as text without re-rendering React every frame. */
export function LiveValue({
  value,
  className,
}: {
  value: MotionValue<number>;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.textContent = formatEm(v);
  });
  return (
    <span ref={ref} className={className}>
      {formatEm(value.get())}
    </span>
  );
}
