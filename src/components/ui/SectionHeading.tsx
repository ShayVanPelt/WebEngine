interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"} ${className}`}
    >
      {label && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
