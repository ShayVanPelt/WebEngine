export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We figure out what your business needs and what your website should accomplish.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "I create the visual direction and page structure tailored to your brand.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I develop the site and make sure it works beautifully across devices.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "I connect the domain, deploy the site, and make everything live.",
  },
  {
    number: "05",
    title: "Support",
    description:
      "Need an update later? I'm available to maintain and improve the site.",
  },
];

export const valueProps = [
  {
    label: "Custom Designs",
    description: "No cookie-cutter templates.",
  },
  {
    label: "Fast & Responsive",
    description: "Built for modern devices.",
  },
  {
    label: "SEO Ready",
    description: "Strong technical foundations.",
  },
  {
    label: "Full Service",
    description: "Design → development → launch → support.",
  },
];

export const trustPoints = [
  {
    title: "Direct communication",
    description: "You work with me — not a project manager, not an intern.",
  },
  {
    title: "Custom development",
    description: "Every site is built from scratch for your specific needs.",
  },
  {
    title: "No template limitations",
    description: "Your site won't look like everyone else's.",
  },
  {
    title: "Modern technology",
    description: "Fast, secure, and built to last with current web standards.",
  },
  {
    title: "Transparent pricing",
    description: "Clear packages with no hidden fees or surprise invoices.",
  },
  {
    title: "Ongoing support",
    description: "I'm here after launch for updates, fixes, and improvements.",
  },
];
