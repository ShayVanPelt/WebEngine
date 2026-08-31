"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="faq"
      className="section-spacing section-padding border-t border-border bg-muted/10"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            label="FAQ"
            title="Common questions"
            description="Straight answers to the things most people ask before starting a project."
            align="center"
          />
        </Reveal>

        <div className="mt-8 divide-y divide-border border-y border-border">
          {faqItems.map((item, i) => (
            <Reveal key={item.question} delay={i * 0.03}>
              <div>
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-sm font-medium text-foreground md:text-base">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-muted-foreground">
                    {openIndex === i ? (
                      <Minus size={16} aria-hidden="true" />
                    ) : (
                      <Plus size={16} aria-hidden="true" />
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
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
