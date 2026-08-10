"use client";

import * as React from "react";
import { Clock, Eye, Pencil, StepForward, Trash2 } from "lucide-react";
import { Button } from "@/components/composition/Button";
import { Badge } from "@/components/composition/Badge";
import { Avatar } from "@/components/composition/Avatar";
import { Progress } from "@/components/composition/Progress";
import getPercentage from "@/lib/numbers";
import { type TicketWithRelations } from "../api";
import { TicketUser } from "../api/ticket_user.api";
import { KanbanCardDetails } from "./KanbanCardDetails";
import { KanbanCardUserSelect } from "./KanbanCardUserSelect";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type KanbanCardProps = {
  card: TicketWithRelations;
  ticketUsers: TicketUser[];
  onAssignUser: (
    ticketId: number,
    assignedToId: number | null,
  ) => Promise<void>;
  onMoveToNextColumn: (ticketId: number) => Promise<void>;
};

export const KanbanCard = ({
  card,
  ticketUsers,
  onAssignUser,
  onMoveToNextColumn,
}: KanbanCardProps) => {
  const isMobile = useIsMobile();
  const mobileCardRef = React.useRef<HTMLDivElement | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const canEditAssignedTo = card.column === "todo";
  const shouldHideEstimate = ["toReview", "toTest", "inTest", "done"].includes(
    card.column ?? "",
  );

  React.useEffect(() => {
    if (!isMobile) {
      setIsActionsOpen(false);
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (!isMobile || !isActionsOpen) return;

    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (mobileCardRef.current?.contains(target)) return;

      setIsActionsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [isActionsOpen, isMobile]);

  const estimate = card.estimate ?? 0;
  const remaining = card.remaining ?? 0;
  const progressValue = getPercentage(estimate, remaining);

  const handleCardClick = () => {
    if (isMobile) {
      setIsActionsOpen((current) => !current);
      return;
    }

    setIsDetailsOpen(true);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    handleCardClick();
  };

  const handleOpenDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsActionsOpen(false);
    setIsDetailsOpen(true);
  };

  const handleMoveToNextColumn = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setIsActionsOpen(false);
    void onMoveToNextColumn(card.id);
  };

  const cardSummary = (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      aria-expanded={isMobile ? isActionsOpen : undefined}
      className={cn(
        "group rounded-lg border border-primary bg-surface p-4",
        "flex flex-col gap-4 cursor-pointer outline-none transition-all",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isMobile && isActionsOpen
          ? "scale-[0.99] blur-[1.5px] opacity-60"
          : null,
      )}
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

  const detailsContent = (
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
  );

  return (
    <>
      {isMobile ? (
        <div ref={mobileCardRef} className="relative">
          {cardSummary}
          {isActionsOpen ? (
            <div className="absolute inset-0 z-10 rounded-lg">
              <button
                type="button"
                aria-label="Fermer les actions du ticket"
                className="absolute inset-0 block h-full w-full rounded-lg"
                onClick={() => {
                  setIsActionsOpen(false);
                }}
              />
              <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center gap-3 px-3">
                <Button
                  type="button"
                  size="default"
                  variant="default"
                  aria-label="Voir le ticket"
                  className="aspect-square p-4 shadow-lg"
                  onClick={handleOpenDetails}
                >
                  <Eye size={20} />
                </Button>
                <Button
                  type="button"
                  size="default"
                  variant="default"
                  aria-label="Modifier le ticket"
                  className="aspect-square p-4 shadow-lg"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Pencil size={20} />
                </Button>
                <Button
                  type="button"
                  size="default"
                  variant="destructive"
                  aria-label="Supprimer le ticket"
                  className="aspect-square p-4 shadow-lg"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Trash2 size={20} />
                </Button>
                <Button
                  type="button"
                  size="default"
                  variant="default"
                  aria-label="Étape suivante"
                  className="aspect-square p-4 shadow-lg"
                  onClick={handleMoveToNextColumn}
                >
                  <StepForward size={20} />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <KanbanCardDetails
        trigger={isMobile ? undefined : cardSummary}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        title={`Ticket ${card.id}`}
        description={card.project?.name ?? "Détails du ticket"}
      >
        {detailsContent}
      </KanbanCardDetails>
    </>
  );
};
