"use client";

import { Alert } from "@/components/ui/alert";
import { Circle, Clock } from "lucide-react";

type KanbanCardProps = {
  title: string;
  isDragging?: boolean;
};

export const KanbanCard = ({ title, isDragging = false }: KanbanCardProps) => {
  return (
    <div
      className="rounded-[4px] p-4 border-primary border flex flex-col gap-2"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <div className="flex flex-row justify-between">
        <div className="text-xs">PROJECT</div>
        <div className="flex flex-row gap-1 text-xs items-center">
          <span>5h</span> <Clock size={12} />
        </div>
      </div>
      <div className="text-sm font-bold text-foreground hover:text-primary">
        1234 - {title}
      </div>
      <div>
        <Alert variant="default"> En attente de réponse </Alert>
      </div>
      <div className="flex flex-row gap-1 items-center text-sm">
        <Circle size={14} /> <span>Michel Michel</span>
      </div>
    </div>
  );
};
