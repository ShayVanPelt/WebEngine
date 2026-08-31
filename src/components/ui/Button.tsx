"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "default",
  className = "",
  type = "button",
  external = false,
}: ButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants = {
    primary:
      "bg-foreground text-background hover:bg-foreground/90",
    secondary:
      "border border-border bg-transparent text-foreground hover:bg-muted",
    ghost:
      "bg-transparent text-foreground hover:bg-muted",
  };

  const sizes = {
    default: "px-6 py-3 text-sm tracking-wide",
    large: "px-8 py-4 text-base tracking-wide",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
      };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes} onClick={onClick}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  );
}
