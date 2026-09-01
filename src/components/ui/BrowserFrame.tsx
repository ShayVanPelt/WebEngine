"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Lock, RefreshCw } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface BrowserFrameProps {
  url: string;
  title?: string;
  className?: string;
  interactive?: boolean;
  scale?: number;
}

export function BrowserFrame({
  url,
  title = "Website Preview",
  className = "",
  interactive = true,
  scale = 1,
}: BrowserFrameProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(container);
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeFailed(true);
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isInView, iframeLoaded]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    setIframeFailed(true);
  };

  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <motion.div
      ref={containerRef}
      className={`group relative ${className}`}
      style={{ scale }}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-2xl shadow-foreground/5">
        {/* Browser Chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          <div className="flex flex-1 items-center gap-2 rounded-md bg-background/60 px-3 py-1.5">
            <Lock size={10} className="text-muted-foreground" aria-hidden="true" />
            <span className="truncate text-[11px] text-muted-foreground">
              {displayUrl}
            </span>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Open ${title} in new tab`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Browser Content */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          {!iframeFailed && isInView ? (
            <>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <RefreshCw
                    size={20}
                    className="animate-spin text-muted-foreground"
                    aria-label="Loading preview"
                  />
                </div>
              )}
              <iframe
                src={url}
                title={title}
                className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
                  iframeLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                tabIndex={-1}
              />
            </>
          ) : (
            <FallbackPreview url={url} title={title} />
          )}

          {!interactive && (
            <div
              className="absolute inset-0 z-10"
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Depth shadow */}
      <div
        className="absolute -inset-4 -z-10 rounded-xl bg-gradient-to-b from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
    </motion.div>
  );
}

function FallbackPreview({ url, title }: { url: string; title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f6f3] to-[#ede9e3] p-8 text-center dark:from-[#1a1816] dark:to-[#0f0f0f]">
      <div className="mb-6 space-y-2">
        <p className="font-display text-2xl font-medium text-foreground/90 md:text-3xl">
          {title}
        </p>
        <p className="text-sm text-muted-foreground">
          Live website preview
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {["Design", "Development", "Responsive", "Bilingual"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        onClick={(e) => e.stopPropagation()}
      >
        Visit Live Site
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
