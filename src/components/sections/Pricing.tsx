"use client";

import { ArrowRight, Check } from "lucide-react";
import {
  businessWebsitePackage,
  customPackage,
  maintenancePlan,
  scopeClarification,
} from "@/data/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Pricing() {
  return (
    <section id="pricing" className="section-spacing section-padding">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            label="Pricing"
            title="Simple pricing. No mystery."
            description="Most small-business websites start at $1,500. If you need custom functionality, we'll scope it together and provide a clear quote before development begins."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-px border border-border bg-border lg:grid-cols-2">
          {/* Business Website */}
          <Reveal delay={0.05}>
            <div className="flex h-full flex-col bg-background p-8 md:p-10 lg:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                {businessWebsitePackage.name}
              </p>

              <p className="mt-6 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                {businessWebsitePackage.price}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {businessWebsitePackage.priceNote}
              </p>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {businessWebsitePackage.description}
              </p>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
                Intended for standard business and marketing websites.
              </p>

              <ul className="mt-8 flex-1 space-y-2.5">
                {businessWebsitePackage.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-foreground/85"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button href="#contact" variant="primary" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Custom */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col bg-muted/20 p-8 md:p-10 lg:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {customPackage.name}
              </p>

              <p className="mt-6 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                {customPackage.priceLabel}
              </p>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {customPackage.description}
              </p>

              <ul className="mt-8 flex-1 space-y-2">
                {customPackage.examples.map((example) => (
                  <li
                    key={example}
                    className="flex items-start gap-3 text-sm text-foreground/70"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    {example}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                {customPackage.supportingText}
              </p>

              <div className="mt-8">
                <Button href="#contact" variant="secondary" className="w-full sm:w-auto">
                  Discuss Your Project
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground/70">
            {scopeClarification}
          </p>
        </Reveal>

        {/* Website Care */}
        <Reveal delay={0.2}>
          <div className="mt-16 border-t border-border pt-12">
            <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  Optional
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium text-foreground">
                  {maintenancePlan.name}
                </h3>
                <p className="mt-3 font-display text-2xl font-medium tracking-tight text-foreground">
                  {maintenancePlan.price}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {maintenancePlan.description}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
                  {maintenancePlan.optionalNote}
                </p>
              </div>

              <div>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {maintenancePlan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-foreground/80"
                    >
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground italic">
                  {maintenancePlan.note}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
