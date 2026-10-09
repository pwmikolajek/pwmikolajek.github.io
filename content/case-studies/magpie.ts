import type { CaseStudy } from "./_types";

export const magpie: CaseStudy = {
  slug: "magpie",
  hero: {
    eyebrow: "Case study · Design tool",
    title: "Magpie",
    role: "Design · Frontend · Tooling",
    year: "2026",
    stack: [
      "HTML",
      "Vanilla JS",
      "Print CSS",
      "localStorage",
      "File System Access API",
      "Headless Chrome",
      "Claude Code",
    ],
  },
  summary:
    "A local PDF studio that lives in the browser. One shared print design system, a library of always-editable documents, and a single command that exports any of them as a print-perfect A4 PDF. It started life as one 70-page playbook file; now it's how our print documents get made — no InDesign anywhere.",
  paragraphs: [
    "Human Made publishes a strategic 70-page playbook — *The Enterprise WordPress Playbook* — for clients and prospects. For years it lived in InDesign: a slow loop of opening the `.indd`, pasting copy from a parallel markdown draft, manually retyping every table-of-contents page number, then hoping nothing orphaned when sections moved. Every restructuring round took hours, errors crept in constantly, and the document itself was locked in a proprietary file that nobody could diff, version, or review line-by-line.",
    "I wanted out. The reframe: what if the book *was* HTML? Print-grade typography is just CSS now; Chrome exports A4 PDFs cleanly with `--print-to-pdf`; and Claude Code, run from the terminal, can do the tedious part — pulling copy from the source PDF and structuring it as semantic page elements — in seconds rather than days. The first build proved it: seventy `.page` elements, the brand's actual typography, a print-ready PDF on demand. But it was one heroic file, married to one document. The moment the playbook needed siblings, the one-off had to become a tool.",
    "That tool is Magpie. The single file was split into a shared design system — one print stylesheet carrying the A4 sizing, the Human Made tokens, and the page components, plus one runtime script with all the editing helpers — that every document imports. Each document is a self-contained folder: its HTML, its dropped images, its source copy, its save file. A dashboard lists the whole library and launches any doc. New documents are drafted in chat — Claude Code scaffolds them against the shared system — and land in the library as just another folder.",
    "The editing surface is the part I care most about: every prose block is editable right on the page — contenteditable on screen, locked away from print. Images drop where they belong, pullouts take a background with a built-in legibility overlay, and one undo stack works across every field (the browser's native one is suppressed; two undo systems is one too many). Everything persists to localStorage under folio-free keys, so inserting a section never orphans the text or images that follow it — a bug that bit me twice before the key design got it right. The whole editorial state serialises to a `.pav` snapshot any teammate can restore on a fresh machine.",
    "Export is one command: `./build-pdf.sh <doc-id>` loads the document with the editing layer disabled and prints a 1:1 A4 PDF through headless Chrome. Fidelity is regression-tested — after any change to the shared CSS, every exported page is pixel-diffed against a known-good baseline, with a target of zero differing pixels. The Playbook ships from Magpie today, the next documents are already in the library, and the source for all of it is plain HTML in git: diff-able, reviewable, owned. No `.indd` in sight.",
  ],
  shots: [
    {
      src: "/case-studies/magpie/01-cover.jpeg",
      alt: "The Enterprise WordPress Playbook cover page — HM red logo, large Sora display type setting ‘The Enterprise WordPress Playbook’ with a red dot accent, Human Made wordmark beneath",
      caption:
        "The Playbook cover, set in Magpie at A4. The ‘Choose image’ pill and ‘Auto-save’ bar are the on-page editing surfaces — they never reach the PDF.",
      kind: "hero",
    },
    {
      src: "/case-studies/magpie/02-toc.jpeg",
      alt: "Contents page — 13 chapter rows with section numbers, titles, and right-aligned page numbers (03, 08, 12, 16, 22, 27, 34, 39, 45, 50, 56, 61, 67)",
      caption:
        "Contents. The page numbers on the right are rewritten at load time from the body pages — they drifted in InDesign every time we restructured; in Magpie they can't.",
      kind: "wide",
    },
    {
      src: "/case-studies/magpie/03-floated-image.jpeg",
      alt: "Body page 04 — section 1.1 ‘The shifting enterprise digital landscape’ with two-column hero treatment, body copy, and an inkblot illustration with a single red dot below",
      caption:
        "An interior page. The illustration was dropped straight onto the page in the browser; the red dot is the brand's signature punctuation, used as anchor.",
      kind: "wide",
    },
    {
      src: "/case-studies/magpie/04-pullout.jpeg",
      alt: "Dark pullout callout on a body page — ‘Built by Human Made · Accelerate.’ with marketing copy and a ‘Check out Accelerate →’ CTA, over a city-skyline background image with overlay",
      caption:
        "A pullout. Drop a background image into the slot; the overlay handles legibility automatically. Pullouts key to the section, not the folio, so they survive renumbering.",
      kind: "wide",
    },
    {
      src: "/case-studies/magpie/05-chapter-opener.jpeg",
      alt: "Chapter 01 opener — black page, ‘Chapter · 01’ and ‘01 / 13’ meta, large ‘01 Executive Summary.’ display with red dot, opening body copy",
      caption:
        "A chapter opener from the shared design system. The numeral and title scale up to read at A4; the ‘01 / 13’ meta tracks chapter progress.",
      kind: "wide",
    },
    {
      src: "/case-studies/magpie/06-spread.jpeg",
      alt: "Two pages stacked — 1.1 ‘The shifting enterprise digital landscape’ followed by 1.2 ‘Platform decisions are business-critical’; running headers, footers, Human Made wordmark, chapter rail",
      caption:
        "Two pages, end to end. Same rhythm, same signature red dot, same auto-synced footer. Multiply by 70 — then by every document in the library.",
      kind: "wide",
    },
  ],
};
