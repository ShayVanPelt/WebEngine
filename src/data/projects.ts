export interface Project {
  slug: string;
  name: string;
  category: string;
  url: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  deliverables: string[];
  features: string[];
  caseStudy: {
    challenge: string;
    approach: string;
    result: string;
    highlights: string[];
  };
  year: string;
  live: boolean;
}

export const projects: Project[] = [
  {
    slug: "lumina-within",
    name: "Lumina Within",
    category: "Wellness",
    url: "https://luminawithin.vercel.app/en",
    shortDescription:
      "A calm, premium wellness experience guiding visitors toward booking a complimentary consultation.",
    description:
      "Lumina Within is a wellness and personal transformation website designed to create a calm, premium, trustworthy experience while guiding visitors toward booking a complimentary consultation.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Responsive Design",
      "Bilingual (EN/FR)",
      "SEO",
      "Framer Motion",
    ],
    deliverables: [
      "Design",
      "Development",
      "Responsive",
      "Bilingual",
      "SEO foundations",
    ],
    features: [
      "Bilingual English/French experience",
      "Custom visual design",
      "Responsive layout",
      "Consultation CTA flow",
      "RTT information sections",
      "About / Meet Aimee",
      "Whole-Person Wellbeing content",
      "Testimonials",
      "FAQ",
      "Contact form",
      "Privacy & disclaimer pages",
    ],
    caseStudy: {
      challenge:
        "Lumina Within needed a professional online presence capable of communicating a calm, trustworthy brand identity. The site had to guide potential clients through a wellness journey — from understanding RTT therapy to booking a complimentary consultation — without feeling clinical or overwhelming.",
      approach:
        "I designed a serene visual language using soft gradients, generous whitespace, and intentional typography. The bilingual structure (English/French) was built into the architecture from day one. Every section was crafted to build trust progressively — from the hero's calming introduction through testimonials and detailed service explanations, culminating in a low-friction consultation booking flow.",
      result:
        "A polished, bilingual website that feels as premium as the services it represents. Visitors can explore RTT information, learn about Aimee's approach, read testimonials, and book a consultation — all within a cohesive, calming experience that works beautifully on every device.",
      highlights: [
        "Calm, premium visual identity",
        "Seamless bilingual experience",
        "Trust-building content architecture",
        "Mobile-first responsive design",
        "Fast, accessible, SEO-ready",
      ],
    },
    year: "2025",
    live: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
