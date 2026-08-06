"use client";

import { Toaster } from "@/components/ui/sonner";
import { ToastsProvider } from "./Toasts";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastsProvider>
      {children}
      <Toaster />
    </ToastsProvider>
  );
}
