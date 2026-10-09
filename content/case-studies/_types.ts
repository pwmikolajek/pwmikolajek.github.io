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
  summary: string;
  paragraphs: string[];
  shots: Shot[];
};
