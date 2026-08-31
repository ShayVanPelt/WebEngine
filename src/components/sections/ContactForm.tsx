"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { budgetOptions, timelineOptions } from "@/data/contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="section-spacing section-padding border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle
              size={48}
              className="mx-auto text-accent"
              aria-hidden="true"
            />
            <h2 className="mt-6 font-display text-2xl font-medium text-foreground">
              Message received
            </h2>
            <p className="mt-4 text-muted-foreground">
              Thanks for reaching out. I&apos;ll review your project details and
              get back to you within 1–2 business days.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-spacing section-padding border-t border-border">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <SectionHeading
            label="Contact"
            title="Start a project"
            description="Fill out the form below and I'll get back to you with next steps."
            align="center"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="Name" htmlFor="name" required>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  placeholder="Your name"
                />
              </FormField>

              <FormField label="Business Name" htmlFor="businessName" required>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  placeholder="Your business"
                />
              </FormField>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="Email" htmlFor="email" required>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  placeholder="you@business.com"
                />
              </FormField>

              <FormField label="Phone" htmlFor="phone">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                  placeholder="Optional"
                />
              </FormField>
            </div>

            <FormField label="Current Website" htmlFor="currentWebsite">
              <input
                type="url"
                id="currentWebsite"
                name="currentWebsite"
                className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                placeholder="https:// (if you have one)"
              />
            </FormField>

            <FormField
              label="What does your business do?"
              htmlFor="businessDescription"
              required
            >
              <textarea
                id="businessDescription"
                name="businessDescription"
                required
                rows={3}
                className="w-full resize-none border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                placeholder="Brief description of your business and services"
              />
            </FormField>

            <FormField
              label="What are you looking for?"
              htmlFor="projectGoals"
              required
            >
              <textarea
                id="projectGoals"
                name="projectGoals"
                required
                rows={3}
                className="w-full resize-none border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                placeholder="New website, redesign, specific features, etc."
              />
            </FormField>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="Approximate Budget" htmlFor="budget" required>
                <select
                  id="budget"
                  name="budget"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Timeline" htmlFor="timeline" required>
                <select
                  id="timeline"
                  name="timeline"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a timeline
                  </option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
                {!isSubmitting && <Send size={16} className="ml-2" />}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>

    </section>
  );
}

function FormField({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}
