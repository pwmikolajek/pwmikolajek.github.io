import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { getCaseStudy } from "@/content/case-studies";
import { SiteHeader } from "@/components/SiteHeader";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyProse } from "@/components/case-study/CaseStudyProse";
import { CaseStudyShots } from "@/components/case-study/CaseStudyShots";
import { BackToWork } from "@/components/case-study/BackToWork";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — ${profile.name}`;
  return {
    title,
    description: project.oneLiner,
    openGraph: {
      title,
      description: project.oneLiner,
      siteName: profile.name,
      images: ["/og.png"],
    },
    twitter: { card: "summary_large_image", title, description: project.oneLiner, images: ["/og.png"] },
  };
}

export default async function WorkSlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const study = getCaseStudy(slug);

  return (
    <main className="px-6 sm:px-10">
      <div className="mx-auto max-w-[1180px]">
        <SiteHeader />

        {study ? (
          <>
            <CaseStudyHero hero={study.hero} summary={study.summary} />
            <CaseStudyProse paragraphs={study.paragraphs} />
            <CaseStudyShots shots={study.shots} />
            <BackToWork />
          </>
        ) : (
          <ComingSoon project={project} />
        )}
      </div>
    </main>
  );
}

function ComingSoon({ project }: { project: { title: string; oneLiner: string; role: string; stack: string[] } }) {
  return (
    <>
      <header className="flex flex-col gap-8 pt-20 sm:pt-28 pb-14 sm:pb-20 border-b hairline">
        <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
          Case study · In progress
        </span>
        <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-[var(--tracking-display)]">
          {project.title}
        </h1>
        <p className="max-w-[60ch] font-display text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug text-[var(--fg)]">
          {project.oneLiner}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 border-t hairline pt-6 sm:grid-cols-4">
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
              Role
            </dt>
            <dd className="text-[14.5px]">{project.role}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:col-span-3">
            <dt className="font-mono text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--muted)]">
              Stack
            </dt>
            <dd className="text-[14.5px]">{project.stack.join(" · ")}</dd>
          </div>
        </dl>
      </header>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[68ch] space-y-6 text-center">
          <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-snug tracking-[var(--tracking-display)]">
            Write-up coming soon.
          </p>
          <p className="text-[var(--muted)]">
            I’m drafting case studies one project at a time. In the meantime, the{" "}
            <Link href="/work/hm-brand-guidelines/" className="link">HM Brand Guidelines</Link>{" "}
            write-up is live.
          </p>
        </div>
      </section>

      <BackToWork />
    </>
  );
}
