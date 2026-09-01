"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import {
  projectTypeOptions,
  timelineOptions,
  type ProjectType,
  type TimelineOption,
} from "@/data/contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/hooks";

const inputClassName =
  "w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [timeline, setTimeline] = useState<TimelineOption | "">("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!projectType) {
      setError("Please select a project type.");
      setIsSubmitting(false);
      return;
    }

    if (!timeline) {
      setError("Please select a timeline.");
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      businessName: formData.get("businessName") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      currentWebsite: (formData.get("currentWebsite") as string) || undefined,
      businessDescription: formData.get("businessDescription") as string,
      projectGoals: formData.get("projectGoals") as string,
      projectType,
      timeline,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send message. Please try again.");
        return;
      }

      setIsSubmitted(true);
      form.reset();
      setProjectType("");
      setTimeline("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="Name" htmlFor="name" required>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className={inputClassName}
                  placeholder="Your name"
                />
              </FormField>

              <FormField label="Business Name" htmlFor="businessName" required>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  autoComplete="organization"
                  className={inputClassName}
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
                  autoComplete="email"
                  className={inputClassName}
                  placeholder="you@business.com"
                />
              </FormField>

              <FormField label="Phone" htmlFor="phone">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className={inputClassName}
                  placeholder="Optional"
                />
              </FormField>
            </div>

            <FormField label="Current Website" htmlFor="currentWebsite">
              <input
                type="text"
                id="currentWebsite"
                name="currentWebsite"
                inputMode="url"
                className={inputClassName}
                placeholder="yoursite.com (if you have one)"
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
                className={cn(inputClassName, "resize-none")}
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
                className={cn(inputClassName, "resize-none")}
                placeholder="New website, redesign, specific features, etc."
              />
            </FormField>

            <FormField label="Project Type" required>
              <div
                className="grid gap-3 sm:grid-cols-2"
                role="radiogroup"
                aria-label="Project type"
              >
                {projectTypeOptions.map((option) => (
                  <SelectionCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={projectType === option.value}
                    onSelect={() => setProjectType(option.value)}
                  />
                ))}
              </div>
            </FormField>

            <FormField label="Timeline" required>
              <div
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                role="radiogroup"
                aria-label="Timeline"
              >
                {timelineOptions.map((option) => (
                  <SelectionCard
                    key={option.value}
                    label={option.label}
                    selected={timeline === option.value}
                    onSelect={() => setTimeline(option.value)}
                    compact
                  />
                ))}
              </div>
            </FormField>

            <div className="pt-2">
              {error && (
                <p className="mb-4 text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}
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

function SelectionCard({
  label,
  description,
  selected,
  onSelect,
  compact = false,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        compact ? "px-3 py-3" : "p-4",
        selected
          ? "border-accent bg-accent/10"
          : "border-border bg-transparent hover:border-foreground/30"
      )}
    >
      <span
        className={cn(
          "block font-medium text-foreground",
          compact ? "text-xs sm:text-sm" : "text-sm"
        )}
      >
        {label}
      </span>
      {description && (
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {description}
        </span>
      )}
    </button>
  );
}

function FormField({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
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
