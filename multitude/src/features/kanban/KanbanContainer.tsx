"use client";

import { useCallback, useState } from "react";
import { Container } from "@/components/composition/Container";
import { KanbanCard } from "./KanbanCard";
import {
  type ColumnId,
  initialKanbanCardsByColumn,
  type KanbanItem,
} from "./kanbanCards";
import {
  CodeXml,
  type LucideIcon,
  ListTodo,
  MessageSquareCode,
  ShieldCheck,
  ShieldCog,
  ShieldQuestionMark,
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DRAG_TYPE_ITEM = "KANBAN_ITEM";

type DragItem = {
  id: string;
  fromColumnId: ColumnId;
};

type KanbanColumn = {
  id: ColumnId;
  icon: LucideIcon;
  label: string;
};

const columns: KanbanColumn[] = [
  { id: "todo", icon: ListTodo, label: "TO DO" },
  { id: "inDevelopment", icon: CodeXml, label: "IN DEVELOPMENT" },
  { id: "toReview", icon: MessageSquareCode, label: "TO REVIEW" },
  { id: "toTest", icon: ShieldQuestionMark, label: "TO TEST" },
  { id: "inTest", icon: ShieldCog, label: "IN TEST" },
  { id: "done", icon: ShieldCheck, label: "DONE" },
];

type DraggableKanbanCardProps = {
  item: KanbanItem;
  columnId: ColumnId;
};

const DraggableKanbanCard = ({ item, columnId }: DraggableKanbanCardProps) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DRAG_TYPE_ITEM,
      item: { id: item.id, fromColumnId: columnId } satisfies DragItem,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [columnId, item.id],
  );

  return (
    <div
      ref={(node) => {
        dragRef(node);
      }}
    >
      <KanbanCard title={item.title} isDragging={isDragging} />
    </div>
  );
};

type KanbanColumnLaneProps = {
  columnId: ColumnId;
  items: KanbanItem[];
  onMove: (
    itemId: string,
    fromColumnId: ColumnId,
    toColumnId: ColumnId,
  ) => void;
};

const KanbanColumnLane = ({
  columnId,
  items,
  onMove,
}: KanbanColumnLaneProps) => {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: DRAG_TYPE_ITEM,
      drop: (dragItem: DragItem) => {
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
      className="border-l border-gray-500 first:border-l-0 p-2 flex flex-col gap-2 overflow-y-auto"
      style={{ backgroundColor: isOver ? "#f8fafc" : "transparent" }}
    >
      {items.map((item) => (
        <DraggableKanbanCard key={item.id} item={item} columnId={columnId} />
      ))}
    </div>
  );
};

export const KanbanContainer = () => {
  const [itemsByColumn, setItemsByColumn] = useState<
    Record<ColumnId, KanbanItem[]>
  >(initialKanbanCardsByColumn);

  const moveItem = useCallback(
    (itemId: string, fromColumnId: ColumnId, toColumnId: ColumnId) => {
      if (fromColumnId === toColumnId) {
        return;
      }

      setItemsByColumn((prev) => {
        const sourceColumnItems = prev[fromColumnId];
        const movedItem = sourceColumnItems.find((item) => item.id === itemId);

        if (!movedItem) {
          return prev;
        }

        return {
          ...prev,
          [fromColumnId]: sourceColumnItems.filter(
            (item) => item.id !== itemId,
          ),
          [toColumnId]: [...prev[toColumnId], movedItem],
        };
      });
    },
    [],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Container className="h-full w-full gap-0">
        <div className="w-full h-full border border-gray-500 flex flex-col">
          <div className="grid grid-cols-6 w-full">
            {columns.map((column) => {
              const Icon = column.icon;

              return (
                <div
                  key={column.id}
                  className="flex uppercase text-base p-2 flex-row gap-2 items-center justify-center border-l border-gray-500 first:border-l-0"
                >
                  <Icon size={16} />
                  <span>{column.label}</span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-6 w-full flex-1 border-t border-gray-500 min-h-0">
            {columns.map((column) => (
              <KanbanColumnLane
                key={`${column.id}-content`}
                columnId={column.id}
                items={itemsByColumn[column.id]}
                onMove={moveItem}
              />
            ))}
          </div>
        </div>
      </Container>
    </DndProvider>
  );
};
