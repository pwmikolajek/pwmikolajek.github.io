"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { projectThumbs } from "@/components/sections/thumbs";

export function ProjectCard({ project }: { project: Project }) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 18 });
  const sy = useSpring(my, { stiffness: 200, damping: 18 });
  const tx = useTransform(sx, (v) => v * 6);
  const ty = useTransform(sy, (v) => v * 6);
  const [hovered, setHovered] = React.useState(false);

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }
  function handleEnter() {
    setHovered(true);
  }

  const hasCaseStudy = Boolean(caseStudies[project.slug]);
  const Thumb = projectThumbs[project.slug];
  const href = `/work/${project.slug}/`;

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className="group relative flex flex-col overflow-hidden border hairline transition-colors duration-300 hover:border-[var(--fg)]"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--hairline)] grain">
        {Thumb ? (
          <Thumb hovered={hovered} />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.08] text-[var(--fg)]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 14px)",
              }}
            />
            <motion.div
              style={{ x: tx, y: ty }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <span className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none tracking-[var(--tracking-display)] text-[var(--fg)] opacity-40">
                {project.title}
              </span>
            </motion.div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.5rem] leading-tight tracking-[var(--tracking-display)]">
            {project.title}
          </h3>
          <ArrowUpRight
            size={20}
            className="mt-1 text-[var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]"
          />
        </div>
        <p className="text-[15px] leading-relaxed text-[var(--muted)]">
          {project.oneLiner}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-3">
          <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
            {project.role}
          </span>
          <span aria-hidden className="h-3 w-px bg-[var(--hairline)]" />
          <span className="font-mono text-[11px] text-[var(--muted)]">
            {project.stack.join(" · ")}
          </span>
          {hasCaseStudy ? (
            <span className="ml-auto font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--fg)]">
              Case study →
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
