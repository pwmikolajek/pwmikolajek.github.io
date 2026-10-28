export const profile = {
  name: "Paweł Mikołajek",
  tagline: "Product Designer & Builder",
  location: "Szczecin, Poland",
  currentRole:
    "I bring a designer’s eye to working products, shaping how they look, feel, and behave.",
  about: [
    "I’m a designer who builds. I came up through agency and brand work (Aromen, Webstacks, Ogilvy clients) and joined Human Made in 2022 as its only designer, running the Figma space and making marketing work. Over time the job moved from drawing tools to shipping them: I now design and build the internal products the team works in, from a PDF review tool to a brand system that AI agents can read.",
    "My day-to-day spans Figma systems, UI components, and prototypes; After Effects and Lottie when something needs to move; and React, TypeScript, and Tailwind when a flat mockup isn’t enough. I build those with Claude Code: the AI writes most of the code, and I direct, review and test it so people get a working surface.",
    "I care about clarity, restraint, and the rhythm of an interface. The work I’m proudest of is the work nobody notices is designed. It just feels obvious.",
  ],
  /** One tight paragraph for the CV, where the About copy would repeat the experience bullets. */
  cvSummary:
    "Designer who builds. I came up through agency and brand work (Aromen, Webstacks, Ogilvy clients) and joined Human Made in 2022 as its only designer. Since then the job has grown from visual design into shaping and shipping the internal products the team works in: Figma systems and prototypes, motion in After Effects and Lottie, and working front ends built with AI that I direct, review and test.",
  contact: {
    email: "pwmikolajek@gmail.com",
    phone: "+48 785 843 349",
    linkedin: "https://www.linkedin.com/in/rejnold/",
    dribbble: "https://dribbble.com/dsgnpvmik",
  },
  metaDescription:
    "Paweł Mikołajek, Product Designer & Builder. Product design, motion, and front-end, currently at Human Made.",
} as const;

export type Profile = typeof profile;
