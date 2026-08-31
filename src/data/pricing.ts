export interface BusinessWebsitePackage {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
}

export interface CustomPackage {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  examples: string[];
  cta: string;
  supportingText: string;
}

export const businessWebsitePackage: BusinessWebsitePackage = {
  id: "business-website",
  name: "Business Website",
  price: "$1,500+",
  priceNote: "starting price",
  description:
    "For businesses that need a polished, professional online presence.",
  features: [
    "Up to 6 standard pages",
    "Custom design",
    "Fully responsive",
    "Contact form",
    "Image galleries",
    "Testimonials",
    "SEO foundations",
    "Analytics setup",
    "Domain connection",
    "Deployment",
    "Launch support",
    "30 days of post-launch bug fixes",
  ],
};

export const customPackage: CustomPackage = {
  id: "custom",
  name: "Custom",
  priceLabel: "Let's talk",
  description:
    "For businesses that need functionality beyond a traditional business website.",
  examples: [
    "Booking systems",
    "Databases",
    "Customer accounts",
    "E-commerce",
    "Payments",
    "API integrations",
    "Advanced forms",
    "Dashboards",
    "Custom web applications",
    "Complex interactive functionality",
  ],
  cta: "Discuss Your Project →",
  supportingText:
    "Every custom project is different. We'll discuss what you need and I'll provide a quote based on the scope.",
};

export const maintenancePlan = {
  name: "Website Care",
  price: "$35/month",
  description: "Optional ongoing hosting and maintenance.",
  features: [
    "Hosting",
    "Technical maintenance",
    "Minor content updates",
    "Bug fixes",
    "Deployment support",
    "Basic technical support",
  ],
  note: "Need a new page, major redesign, or new functionality? Larger changes are quoted separately.",
  optionalNote: "Website Care is optional and separate from your initial website development.",
};

export const scopeClarification =
  "Standard websites are designed for presenting your business, services, and information online. Projects requiring databases, user accounts, payments, booking systems, or complex integrations are considered custom projects.";
