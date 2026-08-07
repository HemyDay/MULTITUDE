"use client";

import { Clock } from "lucide-react";
import { Badge } from "@/components/composition/Badge";
import { Avatar } from "@/components/composition/Avatar";
import { Progress } from "@/components/composition/Progress";
import getPercentage from "@/lib/numbers";
import { type TicketWithRelations } from "../api";
import { TicketUser } from "../api/ticket_user.api";
import { KanbanCardDetails } from "./KanbanCardDetails";
import { KanbanCardUserSelect } from "./KanbanCardUserSelect";

type KanbanCardProps = {
  card: TicketWithRelations;
  isDragging?: boolean;
  ticketUsers: TicketUser[];
  onAssignUser: (
    ticketId: number,
    assignedToId: number | null,
  ) => Promise<void>;
};

export const KanbanCard = ({
  card,
  isDragging = false,
  ticketUsers,
  onAssignUser,
}: KanbanCardProps) => {
  const canEditAssignedTo = card.column === "todo";
  const shouldHideEstimate = ["toReview", "toTest", "inTest", "done"].includes(
    card.column ?? "",
  );

  const estimate = card.estimate ?? 0;
  const remaining = card.remaining ?? 0;
  const progressValue = getPercentage(estimate, remaining);

  const cardSummary = (
    <div
      className="group rounded-lg p-4 border-primary border flex flex-col gap-4 bg-surface cursor-pointer"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <div className="flex flex-row justify-between">
        <Badge colorHex={card.project?.color || "#FC6E51"} className="text-xs">
          {card.project?.name}
        </Badge>
        {!shouldHideEstimate && (
          <div className="flex flex-row gap-1 text-xs items-center text-muted-foreground">
            <span>{card.estimate ?? 0}h</span>
            <Clock size={12} className="stroke-muted-foreground" />
          </div>
        )}
      </div>
      <div className="text-sm font-bold text-foreground group-hover:text-primary">
        {card.id} - {card.title ?? "Untitled ticket"}
      </div>

      {canEditAssignedTo ? (
        <KanbanCardUserSelect
          card={card}
          ticketUsers={ticketUsers}
          onAssignUser={onAssignUser}
        />
      ) : (
        <div className="flex flex-row gap-2 items-center text-xs min-h-5">
          <Avatar
            src={card.assigned_to?.profilePicture}
            name={card.assigned_to?.fullName}
            className="w-5 h-5"
          />
          <span>{card.assigned_to?.fullName ?? "Unassigned"}</span>
        </div>
      )}

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

  return (
    <KanbanCardDetails
      trigger={cardSummary}
      title={`Ticket ${card.id}`}
      description={card.project?.name ?? "Détails du ticket"}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-foreground">
            {card.title ?? "Untitled ticket"}
          </div>
          {card.description ? (
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">
              {card.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Aucune description renseignée.
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Projet
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">
              {card.project?.name ?? "Unassigned"}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Statut
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">
              {card.column ?? "Unknown"}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Estimation
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">
              {card.estimate ?? 0}h
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Restant
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">
              {card.remaining ?? 0}h
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Auteur
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
              <Avatar
                src={card.author?.profilePicture}
                name={card.author?.fullName}
                className="w-6 h-6"
              />
              <span>{card.author?.fullName ?? "Unknown"}</span>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Assigné à
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
              <Avatar
                src={card.assigned_to?.profilePicture}
                name={card.assigned_to?.fullName}
                className="w-6 h-6"
              />
              <span>{card.assigned_to?.fullName ?? "Unassigned"}</span>
            </div>
          </div>
        </div>
      </div>
    </KanbanCardDetails>
  );
};
