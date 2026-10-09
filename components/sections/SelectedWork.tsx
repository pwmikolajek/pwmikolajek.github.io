import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section id="work" className="px-6 sm:px-10 py-28 sm:py-36 border-t hairline">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selected work" title="Internal tools, shipped." />
            <p className="max-w-[36ch] text-[var(--muted)]">
              A slice of the design-and-build work from the last year at
              Human Made — small tools, real users, every one in production.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
