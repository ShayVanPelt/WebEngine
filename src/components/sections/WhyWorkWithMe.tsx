"use client";

import { trustPoints } from "@/data/content";
import { siteConfig } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhyWorkWithMe() {
  return (
    <section className="section-spacing section-padding border-t border-border bg-muted/10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div>
              <SectionHeading
                label="Why Work With Me"
                title="You're not getting passed between five departments"
              />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                I work directly with you from the first conversation to launch.
                No account managers, no outsourced development, no miscommunication.
              </p>
              <div className="mt-10 border-l-2 border-accent pl-6">
                <p className="text-base leading-relaxed text-foreground/80 italic">
                  &ldquo;{siteConfig.author.bio}&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-foreground">
                  — {siteConfig.author.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {siteConfig.author.title}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {trustPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <div className="group">
                  <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
