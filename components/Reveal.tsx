"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

export function Reveal({ delay = 0, children, style, ...rest }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (prefersReduced || !mounted) {
    return (
      <div
        style={style as React.CSSProperties}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
