"use client";

import { ReactNode } from "react";
import NavigationMenu from "./NavigationMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
  theme?: string;
}

export default function MainLayout({
  children,
  theme = "theme-dark-blue",
}: MainLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        `flex h-screen w-screen overflow-hidden bg-background p-4 gap-4 ${theme}`,
        isMobile && "pb-21.25",
      )}
    >
      <NavigationMenu />
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
