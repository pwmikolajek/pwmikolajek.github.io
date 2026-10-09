import * as React from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import { capabilities, toolsStrip, clients } from "@/content/capabilities";
import { experience } from "@/content/experience";
import { testimonials } from "@/content/testimonials";
import { books } from "@/content/books";
import { dailyUi, dribbbleProfile } from "@/content/daily-ui";

export type Ctx = {
  run: (command: string) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
};

type Action = { action: "clear" | "exit" };
export type Result = React.ReactNode | Action;

export function isAction(r: Result): r is Action {
  return typeof r === "object" && r !== null && "action" in (r as object);
}

type Command = {
  name: string;
  aliases?: string[];
  summary: string;
  usage?: string;
  run: (args: string[], ctx: Ctx) => Result;
  complete?: (arg: string) => string[];
};

/* ---------- small building blocks ---------- */

const linkClass =
  "text-[var(--fg)] underline decoration-[var(--hairline-strong)] underline-offset-4 transition-colors hover:decoration-[var(--fg)]";

function Dim({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--muted)]">{children}</span>;
}

function Block({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-pre-wrap">{children}</div>;
}

function Gap() {
  return <div className="h-3" aria-hidden />;
}

function Heading({ children }: { children: React.ReactNode }) {
  return <div className="text-[var(--fg)]">{children}</div>;
}

export function Run({ ctx, cmd, children }: { ctx: Ctx; cmd: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={() => ctx.run(cmd)} className={linkClass}>
      {children ?? cmd}
    </button>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={linkClass}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function findProject(query: string | undefined) {
  if (!query) return undefined;
  const q = clean(query);
  return (
    projects.find((p) => p.slug === q) ??
    projects.find((p) => clean(p.title) === q) ??
    projects.find((p) => p.slug.startsWith(q))
  );
}

/* ---------- commands ---------- */

const SECTIONS = [
  ["about", "who I am"],
  ["work", "selected projects and case studies"],
  ["capabilities", "what I bring to a team"],
  ["experience", "where I've worked"],
  ["kind-words", "what people say"],
  ["books", "favourite books"],
  ["daily-ui", "the Daily UI shots"],
  ["tools", "tools I reach for"],
  ["clients", "who I've worked with"],
  ["contact", "how to reach me"],
] as const;

const commands: Command[] = [
  {
    name: "help",
    aliases: ["?"],
    summary: "list commands",
    run: (_a, ctx) => (
      <div>
        <Heading>Commands</Heading>
        <Gap />
        {[...SECTIONS.map(([n, s]) => [n, s]), ["open", "go to a page or link, e.g. open sparrow"], ["theme", "dark, light, or toggle"], ["clear", "clear the screen (Ctrl+L)"], ["exit", "back to the site (Esc)"]].map(
          ([n, s]) => (
            <div key={n} className="grid grid-cols-[9rem_1fr] gap-x-4">
              <span>
                <Run ctx={ctx} cmd={n}>
                  {n}
                </Run>
              </span>
              <Dim>{s}</Dim>
            </div>
          ),
        )}
        <Gap />
        <Dim>Tab completes, ↑ and ↓ move through history.</Dim>
      </div>
    ),
  },
  {
    name: "ls",
    summary: "list the sections",
    run: (_a, ctx) => (
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {SECTIONS.map(([n]) => (
          <Run key={n} ctx={ctx} cmd={n}>
            {n}
          </Run>
        ))}
      </div>
    ),
  },
  {
    name: "about",
    summary: "who I am",
    run: () => (
      <div>
        <Heading>
          {profile.name}, {profile.tagline}
        </Heading>
        <Dim>{profile.location}</Dim>
        <Gap />
        <Block>{profile.currentRole}</Block>
        {profile.about.map((p, i) => (
          <React.Fragment key={i}>
            <Gap />
            <Block>{p}</Block>
          </React.Fragment>
        ))}
      </div>
    ),
  },
  {
    name: "work",
    aliases: ["projects"],
    summary: "selected projects and case studies",
    usage: "work [project]",
    complete: (arg) => projects.map((p) => p.slug).filter((s) => s.startsWith(arg)),
    run: (args, ctx) => {
      if (args.length === 0) {
        return (
          <div>
            <Heading>Selected work</Heading>
            <Dim>Internal tools, shipped. Type work &lt;project&gt; to read the write-up.</Dim>
            <Gap />
            {projects.map((p) => (
              <div key={p.slug} className="mb-4">
                <div>
                  <Run ctx={ctx} cmd={`work ${p.slug}`}>
                    {p.slug}
                  </Run>{" "}
                  <Dim>
                    {p.title}, {p.year}
                  </Dim>
                </div>
                <Block>{p.oneLiner}</Block>
                <Dim>{p.role}</Dim>
              </div>
            ))}
          </div>
        );
      }
      const project = findProject(args[0]);
      if (!project) {
        return (
          <Block>
            No project called &ldquo;{args[0]}&rdquo;. Try:{" "}
            {projects.map((p, i) => (
              <React.Fragment key={p.slug}>
                {i > 0 && ", "}
                <Run ctx={ctx} cmd={`work ${p.slug}`}>
                  {p.slug}
                </Run>
              </React.Fragment>
            ))}
          </Block>
        );
      }
      const study = getCaseStudy(project.slug);
      if (!study) {
        return (
          <div>
            <Heading>{project.title}</Heading>
            <Dim>
              {project.role} · {project.year}
            </Dim>
            <Gap />
            <Block>{project.oneLiner}</Block>
            <Gap />
            <Dim>Stack: {project.stack.join(", ")}</Dim>
            <Dim>Write-up coming soon.</Dim>
          </div>
        );
      }
      return (
        <div>
          <Heading>{study.hero.title}</Heading>
          <Dim>
            {study.hero.eyebrow} · {study.hero.role} · {study.hero.year}
          </Dim>
          <Dim>Stack: {study.hero.stack.join(", ")}</Dim>
          {study.hero.live && (
            <div>
              <Dim>Live: </Dim>
              <Ext href={study.hero.live.href}>{study.hero.live.label}</Ext>
            </div>
          )}
          <Gap />
          <Block>{study.summary}</Block>
          {study.paragraphs.map((p, i) => (
            <React.Fragment key={i}>
              <Gap />
              <Block>{p}</Block>
            </React.Fragment>
          ))}
          {study.shots.length > 0 && (
            <>
              <Gap />
              <Heading>Screens ({study.shots.length})</Heading>
              {study.shots.map((s, i) => (
                <div key={s.src} className="whitespace-pre-wrap">
                  <Dim>{i + 1}.</Dim> {s.caption ?? s.alt}
                </div>
              ))}
              <Gap />
              <Dim>
                Images are on the page:{" "}
              </Dim>
              <Run ctx={ctx} cmd={`open ${project.slug}`}>
                open {project.slug}
              </Run>
            </>
          )}
        </div>
      );
    },
  },
  {
    name: "capabilities",
    summary: "what I bring to a team",
    run: () => (
      <div>
        <Heading>What I bring to a team</Heading>
        {capabilities.map((c) => (
          <div key={c.title} className="mt-4">
            <div className="text-[var(--fg)]">{c.title}</div>
            <Block>{c.description}</Block>
            <Dim>{c.items.join(" · ")}</Dim>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "experience",
    aliases: ["cv"],
    summary: "where I've worked",
    run: () => (
      <div>
        <Heading>Where I&rsquo;ve worked</Heading>
        {experience.map((r) => (
          <div key={`${r.company}-${r.from}`} className="mt-4">
            <div className="text-[var(--fg)]">
              {r.title}, {r.company}
            </div>
            <Dim>
              {r.from} to {r.to} · {r.location}
            </Dim>
            {r.bullets.map((b, i) => (
              <div key={i} className="whitespace-pre-wrap pl-4 -indent-4">
                - {b}
              </div>
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "kind-words",
    aliases: ["testimonials"],
    summary: "what people say",
    run: () => (
      <div>
        <Heading>Kind words</Heading>
        {testimonials.map((t) => (
          <div key={t.name} className="mt-4">
            <Block>&ldquo;{t.quote}&rdquo;</Block>
            <Dim>
              {t.name}, {t.role}, {t.company}
            </Dim>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "books",
    summary: "favourite books",
    run: () => (
      <div>
        <Heading>Favourite books</Heading>
        {books.map((b) => (
          <div key={b.slug} className="mt-4">
            <div className="text-[var(--fg)]">{b.title}</div>
            <Dim>
              {b.author} · {b.category}
            </Dim>
            <Block>&ldquo;{b.quote.text}&rdquo;</Block>
            <div>
              <Dim>Buy: </Dim>
              <Ext href={b.shop.url}>{b.shop.name}</Ext> <Dim>({b.shop.note})</Dim>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "daily-ui",
    summary: "the Daily UI shots",
    run: () => {
      const nums = dailyUi.map((d) => d.number);
      return (
        <div>
          <Heading>Daily UI</Heading>
          <Block>
            A self-set brief each day, designed and shipped to Dribbble. {dailyUi.length} shots, #{Math.min(...nums)} to #{Math.max(...nums)}.
          </Block>
          <div>
            <Ext href={dribbbleProfile}>{dribbbleProfile}</Ext>
          </div>
        </div>
      );
    },
  },
  {
    name: "tools",
    summary: "tools I reach for",
    run: () => (
      <div>
        <Heading>Tools I reach for</Heading>
        <Block>{toolsStrip.join(" · ")}</Block>
      </div>
    ),
  },
  {
    name: "clients",
    summary: "who I've worked with",
    run: () => (
      <div>
        <Heading>Worked with</Heading>
        <Block>{clients.map((c) => c.name).join(" · ")}</Block>
      </div>
    ),
  },
  {
    name: "contact",
    summary: "how to reach me",
    run: () => (
      <div>
        <Heading>Get in touch</Heading>
        <div>
          <Dim>Email </Dim>
          <Ext href={`mailto:${profile.contact.email}`}>{profile.contact.email}</Ext>
        </div>
        <div>
          <Dim>LinkedIn </Dim>
          <Ext href={profile.contact.linkedin}>{profile.contact.linkedin}</Ext>
        </div>
        <div>
          <Dim>Dribbble </Dim>
          <Ext href={profile.contact.dribbble}>{profile.contact.dribbble}</Ext>
        </div>
      </div>
    ),
  },
  {
    name: "open",
    summary: "go to a page or link",
    usage: "open <project | email | linkedin | dribbble | site>",
    complete: (arg) =>
      [...projects.map((p) => p.slug), "email", "linkedin", "dribbble", "site"].filter((s) =>
        s.startsWith(arg),
      ),
    run: (args, ctx) => {
      const target = args[0]?.toLowerCase();
      if (!target) return <Dim>Usage: open &lt;project | email | linkedin | dribbble | site&gt;</Dim>;
      if (target === "site" || target === "home") return { action: "exit" } satisfies Action;
      if (target === "email") {
        window.location.href = `mailto:${profile.contact.email}`;
        return <Dim>Opening your mail app.</Dim>;
      }
      if (target === "linkedin" || target === "dribbble") {
        window.open(profile.contact[target], "_blank", "noopener,noreferrer");
        return <Dim>Opening {target} in a new tab.</Dim>;
      }
      const project = findProject(target);
      if (project) {
        window.location.assign(`/work/${project.slug}/`);
        return <Dim>Opening {project.title}.</Dim>;
      }
      return (
        <Block>
          Don&rsquo;t know how to open &ldquo;{args[0]}&rdquo;. Try{" "}
          <Run ctx={ctx} cmd="help">
            help
          </Run>
          .
        </Block>
      );
    },
  },
  {
    name: "theme",
    summary: "dark, light, or toggle",
    usage: "theme [dark | light | toggle]",
    complete: (arg) => ["dark", "light", "toggle"].filter((s) => s.startsWith(arg)),
    run: (args, ctx) => {
      const arg = args[0]?.toLowerCase();
      if (!arg) return <Dim>Current theme: {ctx.theme ?? "dark"}. Usage: theme [dark | light | toggle]</Dim>;
      if (arg === "dark" || arg === "light") {
        ctx.setTheme(arg);
        return <Dim>Theme set to {arg}.</Dim>;
      }
      if (arg === "toggle") {
        const next = ctx.theme === "light" ? "dark" : "light";
        ctx.setTheme(next);
        return <Dim>Theme set to {next}.</Dim>;
      }
      return <Dim>Usage: theme [dark | light | toggle]</Dim>;
    },
  },
  {
    name: "clear",
    summary: "clear the screen",
    run: () => ({ action: "clear" }),
  },
  {
    name: "exit",
    aliases: ["quit", "q"],
    summary: "back to the site",
    run: () => ({ action: "exit" }),
  },
];

/* ---------- lookup and completion ---------- */

const byName = new Map<string, Command>();
for (const c of commands) {
  byName.set(c.name, c);
  for (const a of c.aliases ?? []) byName.set(a, c);
}

export const COMMAND_NAMES = commands.map((c) => c.name);

export function runCommand(line: string, ctx: Ctx): Result {
  const [name, ...args] = line.trim().split(/\s+/);
  const cmd = byName.get(name.toLowerCase());
  if (!cmd) {
    return (
      <Block>
        command not found: {name}. Type{" "}
        <Run ctx={ctx} cmd="help">
          help
        </Run>{" "}
        to see what&rsquo;s here.
      </Block>
    );
  }
  return cmd.run(args, ctx);
}

/** Returns the candidate completions for the word being typed. */
export function completions(line: string): { prefix: string; options: string[] } {
  const parts = line.split(/\s+/);
  const last = parts[parts.length - 1].toLowerCase();
  const prefix = parts.slice(0, -1).join(" ") + (parts.length > 1 ? " " : "");
  if (parts.length === 1) {
    const all = [...byName.keys()].filter((n) => !["?", "q"].includes(n));
    return { prefix, options: all.filter((n) => n.startsWith(last)) };
  }
  const cmd = byName.get(parts[0].toLowerCase());
  return { prefix, options: cmd?.complete?.(last) ?? [] };
}
