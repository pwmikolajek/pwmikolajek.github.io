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
  // Deal Room is hidden for now; its case study, thumb and shots stay in place.
  {
    slug: "workbench",
    title: "Workbench",
    oneLiner:
      "A shared planning board for the marketing team, built to replace their spreadsheets. A month calendar is home, with a forward view of the year's campaigns, a content calendar by publishing date, and a drafting room for ideas without a date yet.",
    role: "Design · Frontend · Backend",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "SQLite"],
    year: "2026",
  },
  {
    slug: "sparrow",
    title: "Sparrow",
    oneLiner:
      "Shared PDF review for the team. Pin feedback to the page, reply and resolve in place, and keep the conversation across drafts, with clear links to the latest or an exact version.",
    role: "Design · Frontend · Backend",
    stack: ["React", "TypeScript", "Tailwind", "Express", "SQLite"],
    year: "2026",
  },
  {
    slug: "letter-clash",
    title: "Letter Clash",
    oneLiner:
      "A real-time multiplayer word game built for the team, with a 20-second turn clock, live ghost tiles from your opponent, and a server that owns the rules.",
    role: "Design · Frontend · Backend",
    stack: ["React", "TypeScript", "Vite", "WebSocket", "SQLite"],
    year: "2025",
  },
  {
    slug: "hm-brand-guidelines",
    title: "HM Brand Guidelines",
    oneLiner:
      "From a static reference to a brand suite for people and agents. Shared tokens, editorial guidance and practical tools bring Human Made's brand into the conversation and the work.",
    role: "Design systems · Frontend · Agent workflows",
    stack: ["Design tokens", "JavaScript", "Node.js", "Agent skills"],
    year: "2024 to present",
  },
];
