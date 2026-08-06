"use client";

import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/composition/Container";
import {
  findAllTickets,
  type TicketWithRelations,
} from "@/features/kanban/api";
import { KanbanColumnLane } from "./KanbanColumnLane";
import {
  CodeXml,
  type LucideIcon,
  ListTodo,
  MessageSquareCode,
  ShieldCheck,
  ShieldCog,
  ShieldQuestionMark,
} from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type ColumnId =
  | "todo"
  | "inDevelopment"
  | "toReview"
  | "toTest"
  | "inTest"
  | "done";

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

export const KanbanContainer = () => {
  const [tickets, setTickets] = useState<TicketWithRelations[]>([]);
  const hasStartedFetchRef = useRef(false);

  if (!hasStartedFetchRef.current) {
    hasStartedFetchRef.current = true;

    void findAllTickets()
      .then(({ data, error }) => {
        if (error) throw error;
        setTickets(data ?? []);
      })
      .catch((error) => {
        console.error("[KanbanContainer] Failed to load tickets:", error);
      });
  }

  const moveItem = useCallback(
    (itemId: number, fromColumnId: ColumnId, toColumnId: ColumnId) => {
      if (fromColumnId === toColumnId) {
        return;
      }

      setTickets((prev) => {
        const movedTicket = prev.find((ticket) => ticket.id === itemId);
        if (!movedTicket) {
          return prev;
        }

        if (movedTicket.column !== fromColumnId) {
          return prev;
        }

        return prev.map((ticket) =>
          ticket.id === itemId ? { ...ticket, column: toColumnId } : ticket,
        );
      });
    },
    [],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Container className="h-full w-full gap-0">
        <div className="w-full h-full flex gap-4 overflow-x-auto">
          {columns.map((column) => {
            const Icon = column.icon;
            return (
              <div
                key={column.id}
                className="flex flex-col gap-4 flex-1 p-4 bg-grey rounded-[8px]"
              >
                <div className="flex uppercase text-base flex-row gap-2 items-center justify-start ">
                  <Icon size={16} />
                  <span>{column.label}</span>
                </div>
                <KanbanColumnLane
                  columnId={column.id}
                  cards={tickets.filter(
                    (ticket) => ticket.column === column.id,
                  )}
                  onMove={moveItem}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </DndProvider>
  );
};
