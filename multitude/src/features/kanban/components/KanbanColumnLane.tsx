"use client";

import { type TicketWithRelations } from "@/features/kanban/api";
import { type TicketUser } from "../api/ticket_user.api";
import { KanbanCard } from "./KanbanCard";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export type KanbanColumnLaneProps<TColumnId extends string> = {
  columnId: TColumnId;
  cards: TicketWithRelations[];
  ticketUsers: TicketUser[];
  onAssignUser: (
    ticketId: number,
    assignedToId: number | null,
  ) => Promise<void>;
};

export const KanbanColumnLane = <TColumnId extends string>({
  columnId,
  cards,
  ticketUsers,
  onAssignUser,
}: KanbanColumnLaneProps<TColumnId>) => {
  const isMobile = useIsMobile();

  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={cn(
            "modern-scrollbar-hover flex flex-1 min-h-0 flex-col gap-2 overflow-y-auto overscroll-y-contain touch-pan-y",
            !isMobile ? " pr-1 " : "",
          )}
        >
          {cards.map((card, index) => (
            <Draggable
              key={card.id}
              draggableId={`ticket-${card.id}`}
              index={index}
            >
              {(draggableProvided, snapshot) => (
                <div
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  className={snapshot.isDragging ? "opacity-90" : undefined}
                >
                  <KanbanCard
                    card={card}
                    ticketUsers={ticketUsers}
                    onAssignUser={onAssignUser}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
