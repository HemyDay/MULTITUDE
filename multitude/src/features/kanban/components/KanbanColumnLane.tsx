"use client";

import { type TicketWithRelations } from "@/features/kanban/api";
import { type TicketUser } from "../api/ticket_user.api";
import { useDrag, useDrop } from "react-dnd";
import { KanbanCard } from "./KanbanCard";

const DRAG_TYPE_ITEM = "KANBAN_ITEM";

type DragItem<TColumnId extends string> = {
  id: number;
  fromColumnId: TColumnId;
};

type DraggableKanbanCardProps<TColumnId extends string> = {
  card: TicketWithRelations;
  columnId: TColumnId;
  ticketUsers: TicketUser[];
  onAssignUser: (
    ticketId: number,
    assignedToId: number | null,
  ) => Promise<void>;
};

const DraggableKanbanCard = <TColumnId extends string>({
  card,
  columnId,
  ticketUsers,
  onAssignUser,
}: DraggableKanbanCardProps<TColumnId>) => {
  const [{ isDragging }, dragRef] = useDrag<
    DragItem<TColumnId>,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: DRAG_TYPE_ITEM,
      item: {
        id: card.id,
        fromColumnId: columnId,
      } satisfies DragItem<TColumnId>,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [columnId, card.id],
  );

  return (
    <div
      ref={(node) => {
        dragRef(node);
      }}
    >
      <KanbanCard
        card={card}
        isDragging={isDragging}
        ticketUsers={ticketUsers}
        onAssignUser={onAssignUser}
      />
    </div>
  );
};

export type KanbanColumnLaneProps<TColumnId extends string> = {
  columnId: TColumnId;
  cards: TicketWithRelations[];
  ticketUsers: TicketUser[];
  onMove: (
    itemId: number,
    fromColumnId: TColumnId,
    toColumnId: TColumnId,
  ) => void;
  onAssignUser: (
    ticketId: number,
    assignedToId: number | null,
  ) => Promise<void>;
};

export const KanbanColumnLane = <TColumnId extends string>({
  columnId,
  cards,
  ticketUsers,
  onMove,
  onAssignUser,
}: KanbanColumnLaneProps<TColumnId>) => {
  const [{ isOver }, dropRef] = useDrop<
    DragItem<TColumnId>,
    void,
    { isOver: boolean }
  >(
    () => ({
      accept: DRAG_TYPE_ITEM,
      drop: (dragItem) => {
        onMove(dragItem.id, dragItem.fromColumnId, columnId);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    }),
    [columnId, onMove],
  );

  return (
    <div
      ref={(node) => {
        dropRef(node);
      }}
      className="modern-scrollbar-hover flex flex-1 flex-col gap-2 pr-1 overflow-y-auto"
      style={{ backgroundColor: isOver ? "#f8fafc" : "transparent" }}
    >
      {cards.map((card) => (
        <DraggableKanbanCard
          key={card.id}
          card={card}
          columnId={columnId}
          ticketUsers={ticketUsers}
          onAssignUser={onAssignUser}
        />
      ))}
    </div>
  );
};
