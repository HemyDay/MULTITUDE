import { ReactNode } from "react";
import NavigationMenu from "./NavigationMenu";

interface MainLayoutProps {
  children: ReactNode;
  theme?: string;
}

export default async function MainLayout({
  children,
  theme = "theme-dark-blue",
}: MainLayoutProps) {
  return (
    <div
      className={`flex flex-row h-screen w-screen bg-background p-4 gap-4 ${theme}`}
    >
      <NavigationMenu />
      <div className="h-full w-full ">{children}</div>
    </div>
  );
}
