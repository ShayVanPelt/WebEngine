"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(
    scrollYProgress,
    [0.1, 0.8],
    prefersReducedMotion ? ["0%", "100%"] : ["0%", "100%"]
  );

  return (
    <section
      id="process"
      className="section-spacing section-padding"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            label="Process"
            title="From conversation to launch"
            description="A straightforward process designed to keep things simple for you."
          />
        </Reveal>

        {/* Desktop horizontal timeline */}
        <div className="mt-10 hidden lg:block">
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-px bg-border" aria-hidden="true" />
            <motion.div
              className="absolute top-8 left-0 h-px bg-accent"
              style={{ width: lineWidth }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.1}>
                  <div className="relative pt-16">
                    <div className="absolute top-6 left-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-background">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-xs font-medium text-accent">
                      {step.number}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="mt-8 lg:hidden">
          <div className="relative space-y-0">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08}>
                <div className="relative flex gap-6 pb-8 last:pb-0">
                  {i < processSteps.length - 1 && (
                    <div
                      className="absolute left-[9px] top-6 h-full w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-accent">
                      {step.number}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
