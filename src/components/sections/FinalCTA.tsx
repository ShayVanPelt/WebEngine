"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="section-spacing section-padding">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Ready for a website you&apos;re proud to send people to?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Tell me a little about your business and what you&apos;re looking for.
            I&apos;ll get back to you with the next steps.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="#contact" variant="primary" size="large">
              Start a Project
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button href="#contact" variant="ghost" size="large">
              Have a question? Let&apos;s talk.
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
