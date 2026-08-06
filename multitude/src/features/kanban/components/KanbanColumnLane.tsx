"use client";

import { type TicketWithRelations } from "@/features/kanban/api";
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
};

const DraggableKanbanCard = <TColumnId extends string>({
  card,
  columnId,
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
      <KanbanCard card={card} isDragging={isDragging} />
    </div>
  );
};

export type KanbanColumnLaneProps<TColumnId extends string> = {
  columnId: TColumnId;
  cards: TicketWithRelations[];
  onMove: (
    itemId: number,
    fromColumnId: TColumnId,
    toColumnId: TColumnId,
  ) => void;
};

export const KanbanColumnLane = <TColumnId extends string>({
  columnId,
  cards,
  onMove,
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
        <DraggableKanbanCard key={card.id} card={card} columnId={columnId} />
      ))}
    </div>
  );
};
