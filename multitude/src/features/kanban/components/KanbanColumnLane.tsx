"use client";

import { type TicketWithRelations } from "@/features/kanban/api";
import { type TicketUser } from "../api/ticket_user.api";
import { KanbanCard } from "./KanbanCard";

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
  cards,
  ticketUsers,
  onAssignUser,
}: KanbanColumnLaneProps<TColumnId>) => {
  return (
    <div className="modern-scrollbar-hover flex flex-1 flex-col gap-2 pr-1 overflow-y-auto">
      {cards.map((card) => (
        <KanbanCard
          key={card.id}
          card={card}
          ticketUsers={ticketUsers}
          onAssignUser={onAssignUser}
        />
      ))}
    </div>
  );
};
