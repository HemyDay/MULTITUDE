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
  X,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const navigationItems: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/multitude/dashboard" },
  { label: "Calendrier", icon: Calendar1, href: "/multitude/calendar" },
  { label: "Formulaire", icon: FileText, href: "/multitude/complex-form" },
  { label: "Data Table", icon: Table2, href: "/multitude/data-table" },
  { label: "Carte", icon: Map, href: "/multitude/map" },
];

export default function NavigationMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex flex-row h-fit bg-surface p-3 gap-3 justify-around">
          {navigationItems.map(({ label, icon: Icon, href }) => {
            const isActive =
              pathname === href || pathname?.startsWith(`${href}/`);

            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "flex rounded-[8px] p-3",
                  isActive
                    ? "bg-primary text-on-primary "
                    : "text-foreground hover:bg-background hover:text-primary",
                )}
              >
                <Icon className="h-6 w-6 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-2 overflow-hidden rounded-[8px] bg-surface p-3 transition-[width] duration-300 ease-in-out",
        isOpen ? "w-64" : "w-15",
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
              "flex items-center gap-3 rounded-[8px] p-2 text-left leading-5 transition-colors duration-200 select:none",
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
