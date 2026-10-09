export const profile = {
  name: "Paweł Mikołajek",
  tagline: "Product Designer & Builder",
  location: "Szczecin, Poland",
  currentRole:
    "I bring a designer’s eye to working products, shaping how they look, feel, and behave.",
  about: [
    "I’m a designer who works at the seam between design, motion, and front-end. I came up through agency and brand work (Aromen, Webstacks, Ogilvy clients) and now design and build internal product tools at Human Made.",
    "My day-to-day spans Figma systems, UI components, and prototypes; After Effects and Lottie when something needs to move; and React, TypeScript, and Tailwind when a flat mockup isn’t enough. I write live prototypes with Claude Code so people can use a working surface.",
    "I care about clarity, restraint, and the rhythm of an interface. The work I’m proudest of is the work nobody notices is designed. It just feels obvious.",
  ],
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
