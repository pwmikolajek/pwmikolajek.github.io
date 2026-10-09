export type Capability = {
  title: string;
  description: string;
  items: string[];
};

export const capabilities: Capability[] = [
  {
    title: "Design",
    description:
      "Product design from research to interface. I run in Figma — systems, components, prototypes — and I think in flows, not screens.",
    items: [
      "Figma",
      "Design systems",
      "Prototyping",
      "UI components",
      "Iconography",
      "Brand systems",
    ],
  },
  {
    title: "Motion",
    description:
      "Motion as part of product UI, not decoration. I move from storyboards in After Effects to production-ready Lottie that ships at any scale.",
    items: [
      "After Effects",
      "Lottie",
      "SVG animation",
      "Micro-interactions",
      "Storyboards",
      "Motion principles",
    ],
  },
  {
    title: "Frontend",
    description:
      "I write the front-end I design. Live prototypes built with Claude Code mean the team can use the thing — not just look at it.",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Live prototypes",
      "Claude Code",
    ],
  },
];

export const toolsStrip = [
  "Figma",
  "Adobe Photoshop",
  "InDesign",
  "After Effects",
  "Lottie",
  "Sketch",
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "Claude Code",
];

export const clients = [
  { name: "HubSpot", file: "hs.svg" },
  { name: "DJI", file: "dji.svg" },
  { name: "Human Made", file: "human-made.svg" },
  { name: "Webstacks", file: "webstacks.svg" },
  { name: "Ogilvy", file: "ogilvy.svg" },
] as const;
