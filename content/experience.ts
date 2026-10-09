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
    title: "Product Designer & Builder",
    company: "Human Made",
    location: "Matlock, UK",
    from: "Aug 2022",
    to: "Present",
    bullets: [
      "Sole designer in the agency — designing and shipping in a fast-paced, cross-functional environment.",
      "Created and maintained the central Figma design space — promoted as the repository for the agency and its product, Altis Cloud.",
      "Designed UI components and prototypes; built motion-led marketing assets and brochures.",
      "Designed and helped build a portfolio of internal product tools, several of which are featured on this site.",
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
