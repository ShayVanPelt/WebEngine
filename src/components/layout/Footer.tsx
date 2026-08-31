import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="section-padding section-spacing mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-xl font-medium tracking-tight text-foreground"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Custom websites for small businesses — designed, developed, and
              launched without the template-site look.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Navigation
            </h3>
            <ul className="space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Get in Touch
            </h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with care using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
