"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function FeaturedWork() {
  const project = projects[0];
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const browserScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.95, 1, 0.98]
  );

  const browserY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -20]
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-spacing section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left: heading + project info */}
          <div>
            <Reveal>
              <SectionHeading
                label="Featured Work"
                title="Websites that earn trust on first visit"
                description="Real projects built for real businesses. Every site is custom-designed and developed from the ground up."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Live Website
                  </span>
                </div>

                <h3 className="mt-6 font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                  {project.name}
                </h3>

                <p className="mt-1 text-sm text-accent">{project.category}</p>

                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.deliverables.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    href={project.url}
                    variant="secondary"
                    external
                  >
                    Live Site
                    <ExternalLink size={14} className="ml-2" />
                  </Button>
                  <Button href={`/work/${project.slug}`} variant="ghost">
                    View Case Study
                    <ArrowUpRight size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: browser preview — top-aligned with left column */}
          <Reveal delay={0.2}>
            <motion.div
              className="lg:sticky lg:top-28"
              style={{ scale: browserScale, y: browserY }}
            >
              <div
                role="link"
                tabIndex={0}
                className="block cursor-pointer"
                aria-label={`View ${project.name} case study`}
                onClick={() => router.push(`/work/${project.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/work/${project.slug}`);
                  }
                }}
              >
                <BrowserFrame
                  url={project.url}
                  title={project.name}
                  interactive={false}
                />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
