"use client";

import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import { EditableName } from "@/components/hero/EditableName";
import { ClientMarquee } from "@/components/hero/ClientMarquee";
import { CodePanel } from "@/components/hero/CodePanel";
import { useHeroEdit } from "@/components/hero/useHeroEdit";

const NAME = profile.name;

export function Hero() {
  const edit = useHeroEdit();
  return (
    <section className="relative px-6 sm:px-10">
      <div className="mx-auto flex max-w-[1180px] flex-col">
        <SiteHeader
          links={[
            { href: "#work", label: "Work" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
          ]}
        />

        <div className="grid min-h-[78vh] items-center gap-14 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12">
          <div className="relative z-10 flex flex-col">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]"
          >
            {profile.location}
          </motion.span>

          <EditableName text={NAME} edit={edit} />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-[40ch] font-display text-[clamp(1.15rem,1.6vw,1.4rem)] leading-snug text-[var(--fg)]"
          >
            {profile.tagline}.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-[52ch] text-[var(--muted)]"
          >
            {profile.currentRole}
          </motion.p>
          </div>

          <CodePanel edit={edit} />
        </div>

        <ClientMarquee />
      </div>
    </section>
  );
}
