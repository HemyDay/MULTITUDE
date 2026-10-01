"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/composition/Button";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 400);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      aria-label="Revenir en haut"
      title="Revenir en haut"
      variant="default"
      size="icon"
      className="fixed right-4 bottom-4 z-50 h-12 w-12 rounded-full bg-foreground p-0 text-background shadow-lg hover:bg-foreground/90 sm:right-6 sm:bottom-6"
      onClick={() => {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
          ? "auto"
          : "smooth";
        window.scrollTo({ top: 0, behavior });
      }}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </Button>
  );
}
