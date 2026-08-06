"use client";

import { Clock } from "lucide-react";
import { TicketWithRelations } from "../api";
import { Badge } from "@/components/composition/Badge";
import { Avatar } from "@/components/composition/Avatar";

type KanbanCardProps = {
  card: TicketWithRelations;
  isDragging?: boolean;
};

export const KanbanCard = ({ card, isDragging = false }: KanbanCardProps) => {
  return (
    <div
      className="group rounded-[4px] p-4 border-primary border flex flex-col gap-2 bg-surface"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <div className="flex flex-row justify-between">
        <Badge colorHex={card.project?.color || "#FC6E51"} className="text-xs">
          {card.project?.name}
        </Badge>
        <div className="flex flex-row gap-1 text-xs items-center">
          <span>{card.estimate ?? 0}h</span> <Clock size={12} />
        </div>
      </div>
      <div className="text-sm font-bold text-foreground group-hover:text-primary">
        {card.id} - {card.title ?? "Untitled ticket"}
      </div>

      {/* <Alert variant="default"> En attente de réponse </Alert> */}

      <div className="flex flex-row gap-1 items-center text-sm">
        <Avatar
          src={card.assigned_to?.profilePicture}
          name={card.assigned_to?.fullName}
          size="sm"
        />
        <span>{card.assigned_to?.fullName ?? "Unassigned"}</span>
      </div>
    </div>
  );
};
