import { siteConfig } from "@/lib/site";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    priceRange: "$1,500+",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Web Design",
      "Web Development",
      "SEO",
      "Website Maintenance",
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.title,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
