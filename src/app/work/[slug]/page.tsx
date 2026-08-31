import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} — Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} — Case Study`,
      description: project.shortDescription,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-20">
      {/* Hero */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Back to Work
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
            <Reveal delay={0.1}>
              <div>
                <div className="flex items-center gap-3">
                  {project.live && (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Live Website
                      </span>
                    </>
                  )}
                </div>

                <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  {project.name}
                </h1>

                <p className="mt-2 text-accent">{project.category}</p>

                <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href={project.url} variant="primary" external>
                    Visit Live Site
                    <ExternalLink size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <BrowserFrame
                url={project.url}
                title={project.name}
                interactive={false}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="section-padding border-t border-border bg-muted/10 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <CaseStudySection
            label="The Challenge"
            content={project.caseStudy.challenge}
          />
          <CaseStudySection
            label="The Approach"
            content={project.caseStudy.approach}
          />
          <CaseStudySection
            label="The Result"
            content={project.caseStudy.result}
          />
        </div>
      </section>

      {/* Highlights & Tech */}
      <section className="section-padding py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  Highlights
                </p>
                <h2 className="mt-4 font-display text-2xl font-medium text-foreground md:text-3xl">
                  What we delivered
                </h2>
                <ul className="mt-8 space-y-4">
                  {project.caseStudy.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  Technology
                </p>
                <h2 className="mt-4 font-display text-2xl font-medium text-foreground md:text-3xl">
                  Built with
                </h2>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding border-t border-border py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              Features
            </p>
            <h2 className="mt-4 font-display text-2xl font-medium text-foreground md:text-3xl">
              Everything included
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature, i) => (
              <Reveal key={feature} delay={i * 0.03}>
                <div className="border border-border p-5">
                  <p className="text-sm text-foreground/80">{feature}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Large Preview */}
      <section className="section-padding pb-14 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <BrowserFrame
              url={project.url}
              title={project.name}
              interactive={false}
            />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-border bg-muted/10 py-14 text-center md:py-20">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-foreground md:text-3xl">
              Want a website like this for your business?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Let&apos;s talk about what you need.
            </p>
            <div className="mt-8">
              <Button href="/#contact" variant="primary" size="large">
                Start a Project
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function CaseStudySection({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <Reveal>
      <div className="mb-10 last:mb-0">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          {label}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {content}
        </p>
      </div>
    </Reveal>
  );
}
