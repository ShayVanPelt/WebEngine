"use client";

import { valueProps } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function ValueStrip() {
  return (
    <section className="border-y border-border bg-muted/20" aria-label="Key benefits">
      <div className="section-padding mx-auto max-w-7xl py-8 md:py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {valueProps.map((prop, i) => (
            <Reveal key={prop.label} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">
                  {prop.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
