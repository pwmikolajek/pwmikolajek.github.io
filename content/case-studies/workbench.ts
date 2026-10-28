import type { CaseStudy } from "./_types";

export const workbench: CaseStudy = {
  slug: "workbench",
  hero: {
    eyebrow: "Case study · Internal tool",
    title: "Workbench",
    role: "Design · Frontend · Backend",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui", "dnd-kit", "SQLite", "Drizzle"],
    live: { label: "workbench.tools.hmn.md", href: "https://workbench.tools.hmn.md" },
  },
  summary:
    "A shared planning board for Human Made's marketing team, built to replace the spreadsheets they planned in. A month calendar is home. Around it sit a forward view of the year's campaigns, a content calendar by publishing date, and a drafting room for ideas that don't have a date yet.",
  paragraphs: [
    "The marketing team planned in three places: a forward-view spreadsheet for the year, a content calendar tab for what goes out when, and personal to-do lists for the work in between. Each held part of the picture, none held all of it, and keeping them in step was its own job. I built Workbench to answer the team's three questions in one tool: what do I make and by when, what goes out on which day and channel, and what is coming down the line this year.",
    "The calendar is home. Tasks sit on their due day and drag to a new one. A task carries everything needed to do it: project, campaign, priority, channel, subtasks, notes, files, and comments with @tags that reach the team in Slack. Every view filters by assignee and channel, and the calendar dims what doesn't match rather than hiding it, so the shape of the month stays readable while you look at your own work.",
    "The forward view answers the director's question. The planning year runs across, April to March, and campaigns sit as bars in lanes: partner activity, events, hero content, always-on work. Drag a bar to move it, drag an end to change its dates, draw across empty space to start one; the keyboard does the same. Tentative campaigns are hatched. Moving a campaign offers to take its unfinished tasks along, and a row at the bottom counts posts scheduled each month against a target per channel.",
    "The content calendar came from separating two dates. Due is when the work has to be done; publishes is when it goes out. Giving a task both meant the content marketer could see the month as a list of days with the posts on each, by publishing date, with a status that falls out of what's already known: pending, ready to publish, or published. Links to the copy and the live post sit on the row, a small month overview shows the shape at a glance, and a few notes per month replace a tab nobody read.",
    "Ideas needed somewhere to grow before they earned a date. The drafting room is a bench for undated work, organised by what it is for: audience growth, lead generation, pipeline acceleration, the rest. Each idea has a stage and a name beside it, and \"Give it a date\" moves it onto the schedule. Drafts stay out of every other view, the read API and Slack, so the schedule only ever shows what's real.",
    "The team is three editors and a company that reads. Editors change things; everyone else with a company account sees everything but touches nothing, and every check runs on the server, not just in the interface. A read-only API lets the @human Slack assistant answer questions about the plan, and a small command line handles bulk changes. The database is one SQLite file on a persistent volume, backed up before any migration. I designed and built all of it: Next.js and React on the front end, server actions and Drizzle over SQLite behind them, deployed on Human Made's internal tools platform behind Google sign-in. The screenshots here use a fictional team and sample content.",
  ],
  shots: [
    {
      src: "/case-studies/workbench/01-calendar.webp",
      alt: "Workbench's month calendar for October 2026 with campaign bars across each week, tasks on their days, the current day highlighted, and a dark sidebar listing views and campaigns",
      caption:
        "Home is the month. Campaigns run as bars across the weeks, tasks sit on their due days, and the sidebar keeps every view one click away. All names and tasks shown are sample data.",
      kind: "hero",
    },
    {
      src: "/case-studies/workbench/02-forward-view.webp",
      alt: "The forward view: the planning year from April to March across the top, campaigns as coloured bars in lanes grouped by partner activity, events, hero content and always-on work, with a Today line and a row of posts scheduled against monthly targets",
      caption:
        "The year on one screen. Bars drag to move or resize, tentative campaigns are hatched, and the bottom row counts scheduled posts against each channel's monthly target.",
      kind: "wide",
    },
    {
      src: "/case-studies/workbench/03-task-sheet.webp",
      alt: "A task sheet open over the calendar, scrolled to its notes, four unchecked subtasks, an attach files button and a thread of three comments with an @tag",
      caption:
        "A task carries the work. Notes, subtasks, files and a comment thread sit in one panel; tagging someone sends the comment to the team's Slack channel as a real mention.",
      kind: "wide",
    },
    {
      src: "/case-studies/workbench/04-content-calendar.webp",
      alt: "The content calendar for October as a list of days, each with the posts publishing that day, their channel icon, status chip, format and assignee avatar, beside a small month overview and a notes box",
      caption:
        "What goes out, and when. The content calendar lists the month by publishing date, with a status derived from the work's state and a month overview coloured by it.",
      kind: "wide",
    },
    {
      src: "/case-studies/workbench/05-drafting-room.webp",
      alt: "The drafting room: four columns named Audience growth, Lead generation, Pipeline acceleration and Other, each holding idea cards with a stage chip, who suggested it, a brand and a Give it a date action",
      caption:
        "A bench for ideas. Columns by goal, a stage on each card, and a single action to take an idea onto the schedule once it is ready.",
      kind: "wide",
    },
  ],
};
