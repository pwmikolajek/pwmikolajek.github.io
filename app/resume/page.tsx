import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { capabilities, clients, cvSkills, toolsStrip } from "@/content/capabilities";

/**
 * Print source for the downloadable CV (public/Pawel-Mikolajek-CV.pdf).
 * Regenerate the PDF with `npm run resume` while `npm run dev` is running.
 *
 * Kept deliberately plain so applicant-tracking systems parse it cleanly:
 * one column, standard headings, real text, visible URLs, no letter-spacing,
 * ligatures, icons, tables or images. Static system fonts (not the site's
 * variable fonts) so Chrome embeds TrueType rather than Type 3 fonts.
 */

export const metadata: Metadata = {
  title: `${profile.name}, CV`,
  description: `CV of ${profile.name}, ${profile.tagline}.`,
  robots: { index: false, follow: false },
};

const SITE = "https://pwmikolajek.github.io";
const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const css = `
@page { size: A4; margin: 14mm 16mm; }
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
  max-width: 178mm; margin: 0 auto; padding: 14mm 16mm; background: #fff; color: #111;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10pt; line-height: 1.45;
  font-variant-ligatures: none; font-feature-settings: normal;
  letter-spacing: normal; text-align: left;
  box-shadow: 0 1px 3px rgba(0,0,0,.12);
}
.cv a { color: #111; text-decoration: none; }
.cv h1 { font-family: Georgia, "Times New Roman", serif; font-weight: 400; font-size: 24pt; line-height: 1.1; margin: 0; letter-spacing: normal; }
.cv .tagline { font-size: 12pt; margin: 2pt 0 6pt; }
.cv .contact { color: #333; margin: 0; }
.cv h2 { font-size: 11pt; font-weight: 600; margin: 14pt 0 5pt; padding-bottom: 3pt; border-bottom: 0.75pt solid #bbb; }
.cv h3 { font-size: 10.5pt; font-weight: 600; margin: 0; }
.cv p { margin: 0 0 5pt; }
.cv .meta { color: #444; margin: 1pt 0 3pt; }
.cv ul { margin: 0; padding-left: 13pt; list-style: disc; }
.cv li { margin: 0 0 2pt; }
.cv .item { margin: 0 0 8pt; break-inside: avoid; }
`;

export default function ResumePage() {
  const contact = [
    { label: profile.location },
    { label: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { label: bare(profile.contact.linkedin), href: profile.contact.linkedin },
    { label: bare(profile.contact.dribbble), href: profile.contact.dribbble },
    { label: bare(SITE), href: SITE },
  ];

  return (
    <div className="cv-screen">
      <style>{css}</style>
      <main className="cv">
        <header>
          <h1>{profile.name}</h1>
          <p className="tagline">{profile.tagline}</p>
          <p className="contact">
            {contact.map((c, i) => (
              <span key={c.label}>
                {i > 0 && " | "}
                {c.href ? <a href={c.href}>{c.label}</a> : c.label}
              </span>
            ))}
          </p>
        </header>

        <section>
          <h2>Summary</h2>
          <p>{profile.about[0]}</p>
          <p>{profile.about[1]}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((r) => (
            <div key={`${r.company}-${r.from}`} className="item">
              <h3>
                {r.title}, {r.company}
              </h3>
              <p className="meta">
                {r.location} | {r.from} – {r.to}
              </p>
              <ul>
                {r.bullets.map((b, i) => (
                  // "this site" only makes sense on the web page, not in a PDF.
                  <li key={i}>{b.replace("featured on this site", `featured at ${bare(SITE)}`)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Selected projects</h2>
          {projects.map((p) => (
            <div key={p.slug} className="item">
              <h3>
                {p.title}
                {p.year ? ` (${p.year})` : ""}
              </h3>
              <p className="meta">{p.role.replace(/ · /g, ", ")}</p>
              <p>{p.oneLiner}</p>
              <p className="meta">Stack: {p.stack.join(", ")}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          {[...capabilities, ...cvSkills].map((c) => (
            <p key={c.title}>
              <strong>{c.title}:</strong> {c.items.join(", ")}
            </p>
          ))}
          <p>
            <strong>Tools:</strong> {toolsStrip.join(", ")}
          </p>
        </section>

        <section>
          <h2>Worked with</h2>
          <p>{clients.map((c) => c.name).join(", ")}</p>
        </section>
      </main>
    </div>
  );
}
