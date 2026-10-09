import type { CaseStudy } from "./_types";
import { hmBrandGuidelines } from "./hm-brand-guidelines";
import { dealRoom } from "./deal-room";
import { sparrow } from "./sparrow";
import { letterClash } from "./letter-clash";

export const caseStudies: Record<string, CaseStudy | undefined> = {
  "deal-room": dealRoom,
  "hm-brand-guidelines": hmBrandGuidelines,
  sparrow,
  "letter-clash": letterClash,
};

export function getCaseStudy(slug: string): CaseStudy | null {
  return caseStudies[slug] ?? null;
}
