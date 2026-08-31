"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="section-padding relative mx-auto flex max-w-7xl flex-col items-center justify-center pt-28 pb-12 text-center md:pt-32 md:pb-14">
        <div className="max-w-3xl">
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-accent"
          >
            Web Design & Development
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.5rem] text-balance"
          >
            Your business deserves a website that{" "}
            <span className="text-accent">feels like it.</span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Custom websites for small businesses — designed, developed, and
            launched without the template-site look.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href="#contact" variant="primary" size="large">
              Start a Project
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button href="#work" variant="secondary" size="large">
              See My Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 hidden md:flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Scroll
            </span>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-px bg-border"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
