"use client";

import { type TicketWithRelations } from "@/features/kanban/api";
import { type TicketUser } from "../api/ticket_user.api";
import { KanbanCard } from "./KanbanCard";
import { Draggable, Droppable } from "@hello-pangea/dnd";

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
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="modern-scrollbar-hover flex flex-1 flex-col gap-2 pr-1 overflow-y-auto"
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
