"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn, useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-accent origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="section-padding mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
          <Link
            href="/"
            className="group relative font-display text-lg font-medium tracking-tight text-foreground"
          >
            {siteConfig.name}
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button href="#contact" variant="primary" size="default">
              Start a Project
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {siteConfig.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="font-display text-3xl font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Button
                  href="#contact"
                  variant="primary"
                  size="large"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Start a Project
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
