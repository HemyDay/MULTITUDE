"use client";

import { Clock } from "lucide-react";
import { TicketWithRelations } from "../api";
import { Badge } from "@/components/composition/Badge";
import { Avatar } from "@/components/composition/Avatar";
import { Progress } from "@/components/composition/Progress";

type KanbanCardProps = {
  card: TicketWithRelations;
  isDragging?: boolean;
};

export const KanbanCard = ({ card, isDragging = false }: KanbanCardProps) => {
  const shouldHideEstimate = ["toReview", "toTest", "inTest", "done"].includes(
    card.column ?? "",
  );

  const estimate = card.estimate ?? 0;
  const remaining = card.remaining ?? 0;
  const progressValue =
    estimate > 0
      ? Math.max(0, Math.min(100, ((estimate - remaining) / estimate) * 100))
      : 0;

  return (
    <div
      className="group rounded-[4px] p-4 border-primary border flex flex-col gap-4 bg-surface cursor-grab"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <div className="flex flex-row justify-between">
        <Badge colorHex={card.project?.color || "#FC6E51"} className="text-xs">
          {card.project?.name}
        </Badge>
        {!shouldHideEstimate && (
          <div className="flex flex-row gap-1 text-xs items-center text-muted-foreground">
            <span>{card.estimate ?? 0}h</span>{" "}
            <Clock size={12} className="stroke-muted-foreground" />
          </div>
        )}
      </div>
      <div className="text-sm font-bold text-foreground group-hover:text-primary">
        {card.id} - {card.title ?? "Untitled ticket"}
      </div>

      <div className="flex flex-row gap-2 items-center text-xs">
        <Avatar
          src={card.assigned_to?.profilePicture}
          name={card.assigned_to?.fullName}
          className="w-5 h-5"
        />
        <span>{card.assigned_to?.fullName ?? "Unassigned"}</span>
      </div>

      {card.column === "inDevelopment" ? (
        <div className="mt-auto flex flex-row items-center gap-2">
          <Progress value={progressValue} className="h-1.5" />
          <span className="text-xs text-muted-foreground w-11 text-right">
            {Math.round(progressValue)}%
          </span>
        </div>
      ) : null}
    </div>
  );
};
