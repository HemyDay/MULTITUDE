"use client";

import { ReactNode } from "react";
import NavigationMenu from "./NavigationMenu";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
  theme?: string;
}

export default function MainLayout({
  children,
  theme = "theme-dark-blue",
}: MainLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-row h-screen w-screen overflow-hidden bg-background p-4 gap-4 max-md:pb-21.25",
        theme,
      )}
    >
      <NavigationMenu />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </div>
  );
}
