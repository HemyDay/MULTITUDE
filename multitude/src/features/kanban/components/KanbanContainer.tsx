"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/composition/Button";
import { Container } from "@/components/composition/Container";
import { Dialog } from "@/components/composition/Dialog";
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

type PendingMove = {
  itemId: number;
  fromColumnId: ColumnId;
  toColumnId: ColumnId;
};

const columns: KanbanColumn[] = [
  { id: "todo", icon: ListTodo, label: "TO DO" },
  { id: "inDevelopment", icon: CodeXml, label: "IN DEVELOPMENT" },
  { id: "toReview", icon: MessageSquareCode, label: "TO REVIEW" },
  { id: "toTest", icon: ShieldQuestionMark, label: "TO TEST" },
  { id: "inTest", icon: ShieldCog, label: "IN TEST" },
  { id: "done", icon: ShieldCheck, label: "DONE" },
];

const columnProgression: ColumnId[] = [
  "todo",
  "inDevelopment",
  "toReview",
  "toTest",
  "inTest",
  "done",
];

const canMoveToNextColumnOnly = (
  fromColumnId: ColumnId,
  toColumnId: ColumnId,
): boolean => {
  const fromIndex = columnProgression.indexOf(fromColumnId);
  const toIndex = columnProgression.indexOf(toColumnId);
  return toIndex === fromIndex + 1;
};

export const KanbanContainer = () => {
  const [tickets, setTickets] = useState<TicketWithRelations[]>([]);
  const [isInvalidMoveDialogOpen, setIsInvalidMoveDialogOpen] = useState(false);
  const [pendingMove, setPendingMove] = useState<PendingMove | null>(null);
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

  const applyMove = useCallback(
    (itemId: number, fromColumnId: ColumnId, toColumnId: ColumnId) => {
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

  const moveItem = useCallback(
    (itemId: number, fromColumnId: ColumnId, toColumnId: ColumnId) => {
      if (fromColumnId === toColumnId) {
        return;
      }

      if (!canMoveToNextColumnOnly(fromColumnId, toColumnId)) {
        setPendingMove({ itemId, fromColumnId, toColumnId });
        setIsInvalidMoveDialogOpen(true);
        return;
      }

      applyMove(itemId, fromColumnId, toColumnId);
    },
    [applyMove],
  );

  const handleCancelInvalidMove = useCallback(() => {
    setPendingMove(null);
    setIsInvalidMoveDialogOpen(false);
  }, []);

  const handleForceInvalidMove = useCallback(() => {
    if (!pendingMove) {
      setIsInvalidMoveDialogOpen(false);
      return;
    }

    applyMove(
      pendingMove.itemId,
      pendingMove.fromColumnId,
      pendingMove.toColumnId,
    );
    setPendingMove(null);
    setIsInvalidMoveDialogOpen(false);
  }, [applyMove, pendingMove]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container className="h-full w-full gap-0">
        <Dialog
          open={isInvalidMoveDialogOpen}
          onOpenChange={(open) => {
            setIsInvalidMoveDialogOpen(open);
            if (!open) {
              setPendingMove(null);
            }
          }}
          variantStyle="destructive"
          title="Deplacement non autorise"
          description="Vous ne pouvez deplacer une carte que vers la colonne suivante."
          footer={
            <>
              <Button
                onClick={handleForceInvalidMove}
                size="sm"
                variant="outline"
              >
                Deplacer quand même
              </Button>
              <Button
                onClick={handleCancelInvalidMove}
                size="sm"
                variant="destructive"
              >
                Annuler le deplacement
              </Button>
            </>
          }
        />
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
