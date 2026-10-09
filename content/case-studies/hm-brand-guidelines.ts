import type { CaseStudy } from "./_types";

export const hmBrandGuidelines: CaseStudy = {
  slug: "hm-brand-guidelines",
  hero: {
    eyebrow: "Case study · Brand system",
    title: "HM Brand Guidelines",
    role: "Design systems · Frontend · Agent workflows",
    year: "2024 to present",
    stack: ["Design tokens", "JavaScript", "Node.js", "Express", "pdf-lib", "Agent skills"],
  },
  summary:
    "From a brand reference you look up to a system you can work with. I evolved Human Made's guidelines into a suite for people and agents: shared design tokens, editorial guidance, practical tools, and brand knowledge that travels into the conversation.",
  paragraphs: [
    "The first job was to make the brand easier to find and use. Colours, typography, logo guidance and voice rules needed a clear home. I built a reference page with live examples and a token-based design system beneath it. It gave people somewhere dependable to check a colour, understand a type scale, or find the right asset. But the workflow still relied on someone opening the guidelines, reading them, and translating the rules into their work.",
    "The next step was to make the reference useful in the act of making. A business-card generator turns a few fields into a print-ready PDF. The Asset Library brings brand files into one searchable place. Round Table lets someone arrange a team diagram and export it for a deck. Each tool applies a small part of the system directly, so there's less distance between knowing the rule and using it.",
    "As the team's work moved into conversations with AI, the guidelines needed another way in. I packaged the brand as a skill: an entry point that routes an agent to the relevant rules for tokens, typography, components, layout, voice, imagery and logos. The editorial guidance goes beyond tone adjectives to include format playbooks, examples, and a checklist for reviewing AI-assisted writing. A request can now arrive in ordinary language while the agent has specific rules and values to work from.",
    "That changed the hierarchy of the site. The homepage now starts with the tool someone already uses: Claude Code, Claude.ai, ChatGPT or Slack. Setup instructions and example prompts make the first step concrete. The Slack entry introduces @human as the conversational route to the brand. Underneath, people still get the essentials, with deeper guidance in expandable sections. The detailed rules live in the skill, so the page can be easier to scan without reducing what an agent can learn.",
    "The suite has a defined scope. Brand identity, typography and voice live here; internal application screens, controls and interaction states are routed to Firstlight, Human Made's separate UI reference. Welcome, UI, Assets and Tools make those relationships visible in the navigation. The same separation is written into the skill, giving agents a route to the appropriate reference when the task goes beyond brand styling.",
    "The work moved from publishing guidelines to maintaining usable brand knowledge. People can browse, download or make something directly; agents can read structured references and carry them into a task. Keeping those paths aligned is ongoing design work: rule changes are reflected in the relevant page and skill references, token exports stay in sync, and the skill is versioned for distribution.",
  ],
  shots: [
    {
      src: "/case-studies/hm-brand-guidelines/01-agent-setup.webp",
      alt: "Human Made guidelines homepage leading with AI tool setup tabs and a copyable Claude Code skill installation command",
      caption:
        "The new entry point begins with the tool someone works in. Setup and an example prompt come before the reference material.",
      kind: "hero",
    },
    {
      src: "/case-studies/hm-brand-guidelines/02-human-conversation.webp",
      alt: "Slack tab on the guidelines homepage showing an example request to @human and a response about using the brand guidance",
      caption:
        "The conversational route. The homepage's illustrative Slack exchange shows how a request to @human can bring the brand into an everyday task.",
      kind: "wide",
    },
    {
      src: "/case-studies/hm-brand-guidelines/03-editorial-voice.webp",
      alt: "Human Made's Voice and Tone guidance with expandable editorial rules and examples",
      caption:
        "The system covers how Human Made writes as well as how it looks. Voice rules, editorial principles and format playbooks also live in the skill's references.",
      kind: "wide",
    },
    {
      src: "/case-studies/hm-brand-guidelines/04-tools-suite.webp",
      alt: "Human Made tools hub linking to the business-card generator, Asset Library and Round Table",
      caption:
        "The practical layer of the suite: tools that turn the brand system into a business card, an asset download or a team diagram.",
      kind: "wide",
    },
  ],
};
