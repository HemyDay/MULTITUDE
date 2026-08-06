"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/composition/Button";
import { Container } from "@/components/composition/Container";
import { Dialog } from "@/components/composition/Dialog";
import { useToasts } from "@/components/layout/Toasts";
import {
  findAllTicketUsers,
  findAllTickets,
  updateTicket,
  type TicketUser,
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
  const [ticketUsers, setTicketUsers] = useState<TicketUser[]>([]);
  const [isInvalidMoveDialogOpen, setIsInvalidMoveDialogOpen] = useState(false);
  const [isMissingAssigneeDialogOpen, setIsMissingAssigneeDialogOpen] =
    useState(false);
  const [pendingMove, setPendingMove] = useState<PendingMove | null>(null);
  const hasStartedFetchRef = useRef(false);
  const hasStartedUsersFetchRef = useRef(false);

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

  if (!hasStartedUsersFetchRef.current) {
    hasStartedUsersFetchRef.current = true;

    void findAllTicketUsers()
      .then(({ data, error }) => {
        if (error) throw error;
        setTicketUsers(data ?? []);
      })
      .catch((error) => {
        console.error("[KanbanContainer] Failed to load ticket users:", error);
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

      const movedTicket = tickets.find((ticket) => ticket.id === itemId);
      const isMissingAssigneeForTodoExit =
        fromColumnId === "todo" &&
        toColumnId !== "todo" &&
        movedTicket?.assigned_to_id == null;

      if (!canMoveToNextColumnOnly(fromColumnId, toColumnId)) {
        setPendingMove({ itemId, fromColumnId, toColumnId });
        setIsInvalidMoveDialogOpen(true);
        return;
      }

      if (isMissingAssigneeForTodoExit) {
        setIsMissingAssigneeDialogOpen(true);
        return;
      }

      await applyMove(itemId, fromColumnId, toColumnId);
    },
    [applyMove, tickets],
  );

  const assignUser = useCallback(
    async (itemId: number, assignedToId: number | null) => {
      const ticketTitle = `Ticket #${itemId}`;
      const selectedUser =
        ticketUsers.find((user) => user.id === assignedToId) ?? null;
      const targetLabel = selectedUser?.fullName ?? "Unassigned";
      const groupId = `assign-${itemId}-${Date.now()}`;

      let previousTickets: TicketWithRelations[] = [];

      setTickets((prev) => {
        previousTickets = prev;

        return prev.map((ticket) =>
          ticket.id === itemId
            ? {
                ...ticket,
                assigned_to_id: assignedToId,
                assigned_to: selectedUser,
              }
            : ticket,
        );
      });

      addToast(
        "info",
        "Affectation en cours...",
        `${ticketTitle} est en cours d'affectation à ${targetLabel}`,
        3000,
        groupId,
      );

      try {
        const { error } = await updateTicket(itemId, {
          assigned_to_id: assignedToId,
        });

        if (error) {
          throw error;
        }

        addToast(
          "success",
          "Affectation réussie",
          `${ticketTitle} a été affecté à ${targetLabel}`,
          3000,
          groupId,
        );
      } catch (error) {
        setTickets(previousTickets);

        addToast(
          "destructive",
          "Erreur",
          `Impossible de modifier l'affectation de ${ticketTitle}`,
          3000,
          groupId,
        );
      }
    },
    [addToast, ticketUsers],
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

    const movedTicket = tickets.find(
      (ticket) => ticket.id === pendingMove.itemId,
    );
    const isMissingAssigneeForTodoExit =
      pendingMove.fromColumnId === "todo" &&
      pendingMove.toColumnId !== "todo" &&
      movedTicket?.assigned_to_id == null;

    setPendingMove(null);
    setIsInvalidMoveDialogOpen(false);

    if (isMissingAssigneeForTodoExit) {
      setIsMissingAssigneeDialogOpen(true);
      return;
    }

    await applyMove(
      pendingMove.itemId,
      pendingMove.fromColumnId,
      pendingMove.toColumnId,
    );
  }, [applyMove, pendingMove, tickets]);

  const handleCloseMissingAssigneeDialog = useCallback(() => {
    setIsMissingAssigneeDialogOpen(false);
  }, []);

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
        <Dialog
          open={isMissingAssigneeDialogOpen}
          onOpenChange={setIsMissingAssigneeDialogOpen}
          variantStyle="destructive"
          title="Affectation requise"
          description="Vous ne pouvez pas déplacer ce ticket. Assignez-le d'abord à un utilisateur."
          footer={
            <Button
              onClick={handleCloseMissingAssigneeDialog}
              variant="destructive"
              size="sm"
            >
              Compris
            </Button>
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
                  <span className="select-none">{column.label}</span>
                </div>
                <KanbanColumnLane
                  columnId={column.id}
                  cards={tickets.filter(
                    (ticket) => ticket.column === column.id,
                  )}
                  ticketUsers={ticketUsers}
                  onMove={moveItem}
                  onAssignUser={assignUser}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </DndProvider>
  );
};
