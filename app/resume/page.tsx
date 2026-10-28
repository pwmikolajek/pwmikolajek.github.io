import * as React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { capabilities, clients, cvSkills, toolsStrip } from "@/content/capabilities";

/**
 * Print source for the downloadable CV (public/Pawel-Mikolajek-CV.pdf).
 * Regenerate the PDF with `npm run resume` while `npm run dev` is running.
 *
 * Designed, but kept parseable for applicant-tracking systems: one column and
 * one reading order, standard headings, real text, visible URLs, no tables,
 * icons or images. Dates sit at the right with flexbox but still follow their
 * title in the text. Ligatures are off so "fi" and "fl" extract as letters.
 *
 * The site's typefaces as static TrueType files (./fonts, OFL, from Google
 * Fonts). The site loads them as variable fonts, which Chrome embeds in a PDF
 * as Type 3, and some parsers can't read that. Local files also get their own
 * family names, so they can't be confused with the site's faces.
 */

const display = localFont({ src: "./fonts/Fraunces-Regular.ttf", weight: "400", variable: "--cv-display" });
const sans = localFont({
  src: [
    { path: "./fonts/Geist-Regular.ttf", weight: "400" },
    { path: "./fonts/Geist-SemiBold.ttf", weight: "600" },
  ],
  variable: "--cv-sans",
});
const mono = localFont({ src: "./fonts/GeistMono-Regular.ttf", weight: "400", variable: "--cv-mono" });

export const metadata: Metadata = {
  title: `${profile.name}, CV`,
  description: `CV of ${profile.name}, ${profile.tagline}.`,
  robots: { index: false, follow: false },
};

const SITE = "https://pwmikolajek.github.io";
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
/** The first sentence of a project's one-liner, for a compact entry. */
const firstSentence = (text: string) => text.match(/^.*?\.(\s|$)/)?.[0].trim() ?? text;

const css = `
@page { size: A4; margin: 15mm 17mm 14mm; }
@media print {
  /* The site is dark by default; without this Chrome paints the dark canvas into the page margins. */
  :root, html { color-scheme: light !important; }
  html, body { background: #fff !important; }
  .cv-screen { padding: 0 !important; background: #fff !important; }
  .cv { box-shadow: none !important; padding: 0 !important; }
  nextjs-portal { display: none !important; } /* dev overlay badge */
}
.cv-screen { min-height: 100vh; background: #e9e9e7; padding: 32px 16px; }
.cv {
  --ink: #151515; --muted: #5e5e5e; --rule: #dcdcdc;
  max-width: 176mm; margin: 0 auto; padding: 15mm 17mm 14mm; background: #fff; color: var(--ink);
  font-family: var(--cv-sans), Arial, sans-serif;
  font-size: 9.5pt; line-height: 1.5;
  font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0;
  text-align: left;
  box-shadow: 0 1px 3px rgba(0,0,0,.12);
}
.cv a { color: inherit; text-decoration: none; }
.cv p { margin: 0; }

.cv header { padding-bottom: 12pt; border-bottom: 0.75pt solid var(--ink); }
.cv h1 { font-family: var(--cv-display), Georgia, serif; font-weight: 400; font-size: 30pt; line-height: 1; margin: 0; }
.cv .tagline { font-size: 11.5pt; margin-top: 6pt; }
.cv .contact { color: var(--muted); font-size: 8.5pt; margin-top: 7pt; }
.cv .contact .sep { color: var(--rule); padding: 0 5pt; }

.cv section { margin-top: 16pt; }
.cv h2 {
  font-family: var(--cv-mono), monospace; font-weight: 400; font-size: 7.5pt;
  text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted);
  margin: 0 0 8pt;
}
/* A heading never ends a page alone: it is printed together with its first entry. */
.cv .keep { break-inside: avoid; }
.cv .entry { break-inside: avoid; }
.cv .entry + .entry, .cv .keep + .entry { margin-top: 10pt; }

.cv .row { display: flex; align-items: baseline; justify-content: space-between; gap: 12pt; }
.cv h3 { font-size: 10pt; font-weight: 600; margin: 0; }
.cv h3 .org { font-weight: 400; }
.cv .when { font-family: var(--cv-mono), monospace; font-size: 8pt; color: var(--muted); white-space: nowrap; }
.cv .where { color: var(--muted); font-size: 8.5pt; margin-top: 1pt; }
.cv ul { margin: 5pt 0 0; padding-left: 11pt; list-style: disc; }
.cv li { margin: 0 0 2.5pt; padding-left: 2pt; }
.cv li::marker { color: var(--muted); }

.cv .project + .project { margin-top: 7pt; }
.cv .project .what { margin-top: 1pt; }
.cv .project .stack { color: var(--muted); }

.cv .skills { display: grid; grid-template-columns: 30mm 1fr; column-gap: 8pt; row-gap: 3pt; }
.cv .skills dt { font-weight: 600; }
.cv .skills dd { margin: 0; }
`;

/** A section whose heading stays on the same page as its first entry. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <section>
      <div className="keep">
        <h2>{title}</h2>
        {first}
      </div>
      {rest}
    </section>
  );
}

export default function ResumePage() {
  const contact = [
    { label: profile.location },
    { label: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { label: bare(profile.contact.linkedin), href: profile.contact.linkedin },
    { label: bare(profile.contact.dribbble), href: profile.contact.dribbble },
    { label: bare(SITE), href: SITE },
  ];

  // Each skill appears once: later lines (and the tools list) skip anything already named.
  const seen = new Set<string>();
  const skills = [...capabilities, ...cvSkills, { title: "Tools", items: toolsStrip }]
    .map((c) => ({ title: c.title, items: c.items.filter((item) => !seen.has(item) && seen.add(item)) }))
    .filter((c) => c.items.length > 0);

  return (
    <div className={`cv-screen ${display.variable} ${sans.variable} ${mono.variable}`}>
      <style>{css}</style>
      <main className="cv">
        <header>
          <h1>{profile.name}</h1>
          <p className="tagline">{profile.tagline}</p>
          <p className="contact">
            {contact.map((c, i) => (
              <React.Fragment key={c.label}>
                {i > 0 && <span className="sep"> · </span>}
                {c.href ? <a href={c.href}>{c.label}</a> : c.label}
              </React.Fragment>
            ))}
          </p>
        </header>

        <Section title="Summary">
          <p>{profile.cvSummary}</p>
        </Section>

        <Section title="Experience">
          {experience.map((r) => (
            <div key={`${r.company}-${r.from}`} className="entry">
              <div className="row">
                <h3>
                  {r.title}, <span className="org">{r.company}</span>
                </h3>
                <span className="when">
                  {r.from} – {r.to}
                </span>
              </div>
              <p className="where">{r.location}</p>
              <ul>
                {r.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Selected projects">
          {projects.map((p) => (
            <div key={p.slug} className="project entry">
              <div className="row">
                <h3>
                  {p.title}, <span className="org">{p.role.replace(/ · /g, ", ")}</span>
                </h3>
                {p.year ? <span className="when">{p.year}</span> : null}
              </div>
              <p className="what">
                {firstSentence(p.oneLiner)} <span className="stack">{p.stack.join(", ")}.</span>
              </p>
            </div>
          ))}
        </Section>

        <Section title="Skills">
          <dl className="skills">
            {skills.map((c) => (
              <React.Fragment key={c.title}>
                <dt>{c.title}</dt>
                <dd>{c.items.join(", ")}</dd>
              </React.Fragment>
            ))}
          </dl>
        </Section>

        <Section title="Worked with">
          <p>{clients.map((c) => c.name).join(", ")}</p>
        </Section>
      </main>
    </div>
  );
}
