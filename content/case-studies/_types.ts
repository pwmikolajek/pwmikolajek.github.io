export type Shot = {
  src: string;
  alt: string;
  caption?: string;
  kind?: "hero" | "wide" | "split";
};

export type CaseStudy = {
  slug: string;
  hero: {
    eyebrow: string;
    title: string;
    role: string;
    year: string;
    stack: string[];
    live?: { label: string; href: string };
  };
  problem: string;
  summary: string;
  sections: Array<{ title: string; paragraphs: string[] }>;
  shots: Shot[];
};
