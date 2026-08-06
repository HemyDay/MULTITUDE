"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/composition/Button";
import { Container } from "@/components/composition/Container";
import { Dialog } from "@/components/composition/Dialog";
import { useToasts } from "@/components/layout/Toasts";
import {
  findAllTickets,
  updateTicket,
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
  { id: "todo", icon: ListTodo, label: "A faire" },
  { id: "inDevelopment", icon: CodeXml, label: "En développement" },
  { id: "toReview", icon: MessageSquareCode, label: "À review" },
  { id: "toTest", icon: ShieldQuestionMark, label: "À tester" },
  { id: "inTest", icon: ShieldCog, label: "En test" },
  { id: "done", icon: ShieldCheck, label: "Fini" },
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
  const { addToast } = useToasts();
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
    async (itemId: number, fromColumnId: ColumnId, toColumnId: ColumnId) => {
      // Find the ticket to get its title
      const ticketTitle = `Ticket #${itemId}`;

      // Find the target column label
      const targetColumn = columns.find((c) => c.id === toColumnId);
      const targetColumnLabel = targetColumn?.label || toColumnId;

      // Create a unique groupId for this operation
      const groupId = `move-${itemId}-${Date.now()}`;

      // Optimistic update
      let previousTickets: TicketWithRelations[] = [];

      setTickets((prev) => {
        previousTickets = prev;
        const movedTicket = prev.find((t) => t.id === itemId);
        if (!movedTicket) {
          return prev;
        }

        if (movedTicket.column !== fromColumnId) {
          return prev;
        }

        return prev.map((t) =>
          t.id === itemId ? { ...t, column: toColumnId } : t,
        );
      });

      // Show loading toast
      addToast(
        "info",
        "Déplacement en cours...",
        `${ticketTitle} est en cours de déplacement`,
        3000,
        groupId,
      );

      // Call API to update the ticket
      try {
        const { error } = await updateTicket(itemId, { column: toColumnId });

        if (error) {
          throw error;
        }

        // Show success toast (replaces info toast with same groupId)
        addToast(
          "success",
          "Déplacement réussi",
          `${ticketTitle} a été déplacé vers ${targetColumnLabel}`,
          3000,
          groupId,
        );
      } catch (error) {
        // Rollback on error
        setTickets(previousTickets);
        // Show error toast (replaces info toast with same groupId)
        addToast(
          "destructive",
          "Erreur",
          `Impossible de déplacer ${ticketTitle}`,
          3000,
          groupId,
        );
      }
    },
    [tickets, addToast],
  );

  const moveItem = useCallback(
    async (itemId: number, fromColumnId: ColumnId, toColumnId: ColumnId) => {
      if (fromColumnId === toColumnId) {
        return;
      }

      if (!canMoveToNextColumnOnly(fromColumnId, toColumnId)) {
        setPendingMove({ itemId, fromColumnId, toColumnId });
        setIsInvalidMoveDialogOpen(true);
        return;
      }

      await applyMove(itemId, fromColumnId, toColumnId);
    },
    [applyMove],
  );

  const handleCancelInvalidMove = useCallback(() => {
    setPendingMove(null);
    setIsInvalidMoveDialogOpen(false);
  }, []);

  const handleForceInvalidMove = useCallback(async () => {
    if (!pendingMove) {
      setIsInvalidMoveDialogOpen(false);
      return;
    }

    await applyMove(
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
        <div className="modern-scrollbar w-full h-full flex gap-4 overflow-x-auto">
          {columns.map((column) => {
            const Icon = column.icon;
            return (
              <div
                key={column.id}
                className="flex flex-col gap-4 flex-1 p-4 pr-1 bg-grey rounded-[8px]"
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
