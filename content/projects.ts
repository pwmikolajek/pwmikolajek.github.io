export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  role: string;
  stack: string[];
  year?: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "deal-room",
    title: "Deal Room",
    oneLiner:
      "One link for the latest files and the next agreed step. A working prototype of a shared client space, with a focused client view and publishing tools for the team behind it.",
    role: "Product design · Frontend",
    stack: ["React", "TypeScript", "Tailwind", "Vite", "Base UI"],
    year: "2026",
  },
  {
    slug: "sparrow",
    title: "Sparrow",
    oneLiner:
      "Shared PDF review for the team. Pin feedback to the page, reply and resolve in place, and keep the conversation across drafts — with clear links to the latest or an exact version.",
    role: "Design · Frontend · Backend",
    stack: ["React", "TypeScript", "Tailwind", "Express", "SQLite"],
    year: "2026",
  },
  {
    slug: "letter-clash",
    title: "Letter Clash",
    oneLiner:
      "Real-time multiplayer word game built for the team — turn timer, persistent boards, magnet-feel tile interactions.",
    role: "Design · Frontend",
    stack: ["React", "TypeScript", "Vite", "WebSocket", "SQLite"],
    year: "2025",
  },
  {
    slug: "hm-brand-guidelines",
    title: "HM Brand Guidelines",
    oneLiner:
      "From a static reference to a brand suite for people and agents. Shared tokens, editorial guidance and practical tools bring Human Made's brand into the conversation — and the work.",
    role: "Design systems · Frontend · Agent workflows",
    stack: ["Design tokens", "JavaScript", "Node.js", "Agent skills"],
    year: "2024 — present",
  },
];
