export interface Service {
  id: string;
  title: string;
  description: string;
  detail: string;
}

export const services: Service[] = [
  {
    id: "design",
    title: "Website Design",
    description: "Custom visual identity and page layouts tailored to the business.",
    detail:
      "Every layout, color, and typographic choice is made specifically for your brand — not pulled from a template library.",
  },
  {
    id: "development",
    title: "Website Development",
    description: "Fast, responsive, modern websites built with current web technologies.",
    detail:
      "Built with Next.js and TypeScript for performance, maintainability, and a foundation that scales with your business.",
  },
  {
    id: "deployment",
    title: "Domain + Deployment",
    description: "I handle the technical setup needed to get the site online.",
    detail:
      "From domain configuration to SSL certificates and production deployment — you don't need to touch a server.",
  },
  {
    id: "seo",
    title: "SEO Foundations",
    description:
      "Proper metadata, structure, performance, accessibility, and search-engine fundamentals.",
    detail:
      "Semantic HTML, optimized metadata, sitemaps, and performance tuning so search engines can find and rank your site.",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Ongoing updates, changes, fixes, and technical support.",
    detail:
      "Your site stays secure, up-to-date, and running smoothly. Minor content changes and bug fixes are handled promptly.",
  },
  {
    id: "custom",
    title: "Custom Features",
    description:
      "Forms, booking integrations, APIs, galleries, animations, and other functionality when needed.",
    detail:
      "Need a booking system, custom form logic, or a third-party integration? I build features that fit your exact workflow.",
  },
];
