import { siteConfig } from "@/lib/site";

export default function manifest() {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#1a1a1a",
  };
}
