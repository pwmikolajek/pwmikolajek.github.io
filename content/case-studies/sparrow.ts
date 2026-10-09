import type { CaseStudy } from "./_types";

export const sparrow: CaseStudy = {
  slug: "sparrow",
  hero: {
    eyebrow: "Case study · Internal tool",
    title: "Sparrow",
    role: "Design · Frontend · Backend",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "shadcn/ui", "PDF.js", "TipTap", "Express", "SQLite"],
    live: { label: "sparrow.tools.hmn.md", href: "https://sparrow.tools.hmn.md" },
  },
  summary:
    "A shared PDF review tool for Human Made. Pin a comment to the detail you're discussing, keep the replies together, and resolve the thread in place. New drafts sit alongside the conversation, with links to either the latest version or the exact revision under review.",
  paragraphs: [
    "Reviewing a PDF as a team can turn one document into five marked-up copies and a long email thread. Someone then has to reconcile the notes, work out which draft each person read, and ask what still needs a decision. I built Sparrow to give the team one place to read the work, discuss it in context, and see what remains open.",
    "The central interaction is a plain click on the page. A composer opens beside the point you've chosen, and the saved comment becomes a numbered pin. Replies and edits happen there too. The sidebar gives you a way to browse the conversation, filter to the current page, and jump to a note. Resolve and Reply stay visible on each thread, so the next action is available without hunting through a hover state.",
    "That proximity took iteration. The first version placed a pin on the document but sent you to the sidebar to write, separating the comment from its context. I moved the composer onto the page, made it follow zoom and scroll, and adjusted its position near the viewport edges. A note can now attach to a precise spot or to the whole page, and its author can move it to another page. Draft protection and visible saving and error states help keep a stray click or failed request from losing the reviewer's work.",
    "Versioning needed an equally clear contract. The current default carries comments, replies and resolution states forward at the same page number and position. Reviewers can correct their placement when the layout changes. I also built an optional page-matching mode that uses text fingerprints and similarity to suggest where comments belong, with uncertain matches left for review. Keeping these behaviours explicit matters: preserving the conversation is useful; presenting a guessed location as certain isn't.",
    "Sharing makes the version choice visible. One link always opens the latest draft; another stays on the exact revision being discussed. The viewer labels older versions and offers a route back to the latest. On small screens, Pages, Document and Comments become separate panels so the document and the conversation each have room.",
    "I designed and built the interface and backend: React, PDF.js and TipTap on the front end, with Express, SQLite and file storage behind it. Sparrow runs as an internal tool behind Human Made's Google sign-in. Recent work has gone into making repeat reviews dependable: clearer controls, recoverable drafts, explicit version links and feedback that survives new drafts.",
  ],
  shots: [
    {
      src: "/case-studies/sparrow/01-document-view.webp",
      alt: "Sparrow's updated PDF viewer with page thumbnails, a numbered comment pin and a sidebar with visible Resolve and Reply actions",
      caption:
        "The updated viewer: pages, document and discussion share one screen. Resolve and Reply are visible on each thread. Screenshots use a sample document and demonstration comments.",
      kind: "hero",
    },
    {
      src: "/case-studies/sparrow/02-inline-thread.webp",
      alt: "An inline comment editor beside its pin, with controls to move the note to another page, attach it to the whole page or resolve it",
      caption:
        "Work on the comment where it belongs. The inline editor keeps the document in view and lets a note attach to a precise spot or the page as a whole.",
      kind: "wide",
    },
    {
      src: "/case-studies/sparrow/03-share-version.webp",
      alt: "Sparrow's Share menu offering separate links to the latest version and the exact revision currently displayed",
      caption:
        "Two links, two clear purposes: keep colleagues on the latest draft, or point them to the exact revision you're discussing.",
      kind: "wide",
    },
    {
      src: "/case-studies/sparrow/04-dashboard.webp",
      alt: "Sparrow project dashboard showing a sample PDF's cover, version, page count, open comments and review and upload actions",
      caption:
        "The library keeps the current version and open feedback visible, with a direct route into the review or the next upload.",
      kind: "wide",
    },
  ],
};
