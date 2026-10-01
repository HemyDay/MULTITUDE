import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  number: number;
  title: string;
  noTitle?: boolean;
  children: ReactNode;
}

export default function Section({
  id,
  number,
  title,
  noTitle = false,
  children,
}: SectionProps) {
  return (
    <section id={id} className="flex flex-col gap-4">
      {!noTitle && (
        <h2 className="text-2xl font-bold">
          <span>{number}</span> | {title}
        </h2>
      )}
      {children}
    </section>
  );
}
