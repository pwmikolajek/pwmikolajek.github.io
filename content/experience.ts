export type Role = {
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    title: "Visual Designer",
    company: "Human Made",
    location: "Matlock, UK",
    from: "Aug 2022",
    to: "Present",
    bullets: [
      "Joined as the agency’s only designer and, on my own initiative, grew the role beyond visual design into designing and building internal products end to end (interface, front end and backend) with AI-assisted development in Claude Code.",
      "Designed and built Sparrow, a PDF review tool in production for the team, with pinned comments, threads resolved in place, and share links to the latest or an exact version (React, PDF.js, TipTap, Express, SQLite).",
      "Turned the Human Made brand guidelines from a static reference into a suite for people and AI agents: design tokens, editorial voice guidance, an agent skill for Claude Code, Claude.ai, ChatGPT and Slack, and generators for business cards, assets and team diagrams.",
      "Designed and built Workbench, the marketing team’s planning board, to replace their spreadsheets: a month calendar as home, a forward view of the year’s campaigns, a content calendar by publishing date, and a drafting room for undated ideas (Next.js, SQLite).",
      "Created and maintained the central Figma design space for the agency and Altis Cloud, and produced motion and marketing assets.",
    ],
  },
  {
    title: "Creative Designer",
    company: "Webstacks",
    location: "San Diego, US",
    from: "Mar 2021",
    to: "Aug 2022",
    bullets: [
      "Worked inside the design department through agile sprints and daily stand-ups.",
      "Designed UI components and contributed to a broader, multi-product design system.",
      "Produced vector illustrations in Figma and Illustrator, plus SVG-friendly web animations in After Effects + Lottie.",
    ],
  },
  {
    title: "Multimedia Designer",
    company: "Aromen BVBA",
    location: "Wevelgem, Belgium",
    from: "Jan 2018",
    to: "Jul 2022",
    bullets: [
      "Led cross-media projects across branding, illustration, and UI for the Aromen App and webshop (WooCommerce, later Odoo).",
      "Built a complete label and packaging system across hundreds of product lines.",
      "Produced 3D mockups, exhibition collateral, signage, and the company’s catalogues and decks.",
    ],
  },
];
