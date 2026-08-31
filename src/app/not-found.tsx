import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center section-padding text-center">
      <h1 className="font-display text-6xl font-medium text-foreground">404</h1>
      <p className="mt-4 text-muted-foreground">
        This page doesn&apos;t exist.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary">
          Back Home
        </Button>
      </div>
    </section>
  );
}
