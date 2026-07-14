"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppWindow,
  Calendar1,
  FileText,
  LayoutDashboard,
  LucideIcon,
  Map,
  Table2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigationItems: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Calendrier", icon: Calendar1, href: "/multitude/calendar" },
  { label: "Formulaire", icon: FileText, href: "/multitude/complex-form" },
  { label: "Dashboard", icon: LayoutDashboard, href: "/multitude/dashboard" },
  { label: "Data Table", icon: Table2, href: "/multitude/data-table" },
  { label: "Carte", icon: Map, href: "/multitude/map" },
  { label: "Design System", icon: AppWindow, href: "/multitude/design-system" },
];

export default function NavigationMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-2 overflow-hidden rounded-[8px] bg-surface p-3 transition-[width] duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16",
      )}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {navigationItems.map(({ label, icon: Icon, href }) => {
        const isActive = pathname === href || pathname?.startsWith(`${href}/`);

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md p-2 text-left leading-5 transition-colors duration-200",
              isActive
                ? "bg-primary text-on-primary font-bold"
                : "text-foreground hover:bg-background hover:text-primary",
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap transition-all duration-50 ease-in-out",
                isOpen ? "max-w-48 opacity-100" : "max-w-0 opacity-0",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
