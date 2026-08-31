"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Services() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="services"
      className="section-spacing section-padding border-t border-border bg-muted/10"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            label="Services"
            title="Everything your website needs, handled"
            description="From initial design to ongoing maintenance — one person, one point of contact, no runaround."
          />
        </Reveal>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
              <div
                className="group cursor-pointer py-6 md:py-7"
                onMouseEnter={() => setActiveId(service.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() =>
                  setActiveId(activeId === service.id ? null : service.id)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(activeId === service.id ? null : service.id);
                  }
                }}
                aria-expanded={activeId === service.id}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-medium text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-3 pl-8 text-sm leading-relaxed text-muted-foreground md:text-base md:pl-10">
                      {service.description}
                    </p>
                  </div>

                  <motion.span
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground"
                    animate={{
                      rotate: activeId === service.id ? 45 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </div>

                <AnimatePresence>
                  {activeId === service.id && (
                    <motion.div
                      initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 pl-8 text-sm leading-relaxed text-foreground/70 md:pl-10">
                        {service.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
