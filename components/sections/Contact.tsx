import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <footer id="contact" className="relative px-6 sm:px-10 pt-28 sm:pt-36 pb-12 border-t hairline">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
            Get in touch
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.04] tracking-[var(--tracking-display)]">
            Designing something I should
            <br />
            <a href={`mailto:${profile.contact.email}`} className="link inline-block">
              say hello
            </a>{" "}
            about?
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-16 grid gap-10 border-t hairline pt-10 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
                Email
              </div>
              <a href={`mailto:${profile.contact.email}`} className="link text-[1.0625rem]">
                {profile.contact.email}
              </a>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
                Elsewhere
              </div>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[1.0625rem]">
                <li>
                  <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="link">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={profile.contact.dribbble} target="_blank" rel="noreferrer" className="link">
                    Dribbble
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t hairline pt-8 text-[var(--muted)]">
          <div className="flex items-center gap-3">
            <Logo size={20} />
            <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)]">
              © {new Date().getFullYear()} {profile.name}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)]">
            Built with Next.js · live prototypes by Claude Code
          </span>
        </div>
      </div>
    </footer>
  );
}
