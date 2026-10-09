import type { CaseStudy } from "./_types";

export const dealRoom: CaseStudy = {
  slug: "deal-room",
  hero: {
    eyebrow: "Case study · Product prototype",
    title: "Deal Room",
    role: "Product design · Frontend",
    year: "2026",
    stack: ["React", "TypeScript", "Tailwind", "Vite", "Base UI"],
  },
  summary:
    "A shared client space for Human Made: the current files, the agreed plan, and a clear next step. I designed and built a working prototype that brings the client briefing and the team's publishing workflow into one place.",
  paragraphs: [
    "An estimate becomes a proposal. The proposal gets revised. An audit, a diagram and a contract follow in separate email threads. For the person joining the conversation halfway through, the questions are simple: which file is current, what needs my attention, and who do I ask? Deal Room starts with those questions. The design goal was to let a client find the latest estimate and identify the next step, its owner and its date within a minute.",
    "The project explores two sides of the same relationship. The employee workspace brings rooms, documents, people and activity together, with a conversational assistant called Human. The client space narrows the focus to three pages: Overview, Files and Plan. I made the client's name lead, kept their Human Made contact in view, and gave the overview the rhythm of a briefing: what's changed, what happens next, and where to find the work. Internal deal stages and commercial notes stay in the employee experience.",
    "The files are the work itself. An audit opens with its scores and recommendations; a proposal keeps its pricing table; an uploaded HTML prototype remains interactive. The file browser uses previews of the content so people can recognise what they're looking for before opening it. Replacing a file keeps its link, which means an email already sent can still lead to the current version.",
    "The publishing model is a design decision too. A new space starts closed. Uploads arrive as drafts. Editors deliberately publish files and share the space, with a client preview to check what will be visible. They manage files and plan steps inside the same space they're preparing for the client. Each step names an owner and a date, or says they're still to agree; it can also link directly to the relevant file.",
    "I built the less tidy moments into the prototype too: replacing a document, removing one that's linked from the plan, keeping entered text after a failed save, and retrying an upload. Human can propose document changes for staff to review before applying them. Working interactions made the product decisions concrete enough to discuss and revise, which static screens couldn't do.",
    "The result is an interactive React and TypeScript prototype with fictional clients and sample content. It models the workflows in browser memory, and Human's replies are mocked. Authentication, server-side permissions and persistent storage remain work for a production build. What you see here is the product model, interface and interaction design, built in code.",
  ],
  shots: [
    {
      src: "/case-studies/deal-room/01-overview.webp",
      alt: "Harbour Press client preview with a project briefing, named contact, next steps and recently updated files",
      caption:
        "The client briefing: a recognisable project, a named contact, and the next steps with owners and dates. All client names and project details shown are sample data.",
      kind: "hero",
    },
    {
      src: "/case-studies/deal-room/02-files.webp",
      alt: "Close-up of three Discovery file previews: the client landing page, site audit and workshop notes",
      caption:
        "Recognise the work before opening it. Files are grouped into plain-language folders and previewed using their actual content.",
      kind: "wide",
    },
    {
      src: "/case-studies/deal-room/03-audit.webp",
      alt: "Close-up of the website audit’s performance, accessibility, best-practice and SEO scores, with critical and important findings",
      caption:
        "The document keeps its form. An audit opens in the space with its scores and findings; interactive HTML files can run here too.",
      kind: "wide",
    },
    {
      src: "/case-studies/deal-room/04-publishing.webp",
      alt: "Close-up of the staff upload dialog with a sample workshop PDF selected, its name and folder, and an explanation that uploads remain drafts",
      caption:
        "Publishing starts with a clear boundary. The upload dialog says who can see the file: it stays a draft for Human Made until someone deliberately publishes it to the client.",
      kind: "wide",
    },
  ],
};
