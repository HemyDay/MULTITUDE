"use client";

import { useCallback, useRef, useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
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
  PlusIcon,
} from "lucide-react";
import { findAllTicketUsers, TicketUser } from "../api/ticket_user.api";

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

type PendingForcedMove = {
  ticketId: number;
  ticketTitle: string;
  destinationColumnId: ColumnId;
  destinationLabel: string;
  result: DropResult;
};

type MoveDialogMode = "forceMove" | "missingAssignee";

const columns: KanbanColumn[] = [
  { id: "todo", icon: ListTodo, label: "A faire" },
  { id: "inDevelopment", icon: CodeXml, label: "En développement" },
  { id: "toReview", icon: MessageSquareCode, label: "À review" },
  { id: "toTest", icon: ShieldQuestionMark, label: "À tester" },
  { id: "inTest", icon: ShieldCog, label: "En test" },
  { id: "done", icon: ShieldCheck, label: "Fini" },
];

const isColumnId = (value: string): value is ColumnId =>
  columns.some((column) => column.id === value);

const parseTicketId = (draggableId: string): number | null => {
  if (!draggableId.startsWith("ticket-")) return null;

  const parsed = Number(draggableId.replace("ticket-", ""));
  return Number.isFinite(parsed) ? parsed : null;
};

const canMoveToTargetColumn = (
  sourceColumnId: ColumnId,
  destinationColumnId: ColumnId,
) => {
  if (sourceColumnId === destinationColumnId) return true;

  const sourceIndex = columns.findIndex(
    (column) => column.id === sourceColumnId,
  );
  const destinationIndex = columns.findIndex(
    (column) => column.id === destinationColumnId,
  );

  return destinationIndex === sourceIndex + 1;
};

const moveTickets = (
  previous: TicketWithRelations[],
  result: DropResult,
): TicketWithRelations[] => {
  const sourceColumnId = result.source.droppableId;
  const destination = result.destination;
  const destinationColumnId = destination?.droppableId;

  if (!destinationColumnId) return previous;
  if (!isColumnId(sourceColumnId) || !isColumnId(destinationColumnId)) {
    return previous;
  }

  const columnBuckets: Record<ColumnId, TicketWithRelations[]> = {
    todo: [],
    inDevelopment: [],
    toReview: [],
    toTest: [],
    inTest: [],
    done: [],
  };
  const unknownTickets: TicketWithRelations[] = [];

  for (const ticket of previous) {
    if (ticket.column && isColumnId(ticket.column)) {
      columnBuckets[ticket.column].push(ticket);
    } else {
      unknownTickets.push(ticket);
    }
  }

  const sourceTickets = [...columnBuckets[sourceColumnId]];
  const destinationTickets =
    sourceColumnId === destinationColumnId
      ? sourceTickets
      : [...columnBuckets[destinationColumnId]];

  const [movedTicket] = sourceTickets.splice(result.source.index, 1);
  if (!movedTicket) return previous;

  const nextMovedTicket: TicketWithRelations =
    sourceColumnId === destinationColumnId
      ? movedTicket
      : { ...movedTicket, column: destinationColumnId };

  destinationTickets.splice(destination.index, 0, nextMovedTicket);

  columnBuckets[sourceColumnId] = sourceTickets;
  columnBuckets[destinationColumnId] = destinationTickets;

  return [
    ...columnBuckets.todo,
    ...columnBuckets.inDevelopment,
    ...columnBuckets.toReview,
    ...columnBuckets.toTest,
    ...columnBuckets.inTest,
    ...columnBuckets.done,
    ...unknownTickets,
  ];
};

export const KanbanContainer = () => {
  const { addToast } = useToasts();
  const [tickets, setTickets] = useState<TicketWithRelations[]>([]);
  const [ticketUsers, setTicketUsers] = useState<TicketUser[]>([]);
  const [invalidMoveDialogOpen, setInvalidMoveDialogOpen] = useState(false);
  const [moveDialogMode, setMoveDialogMode] = useState<MoveDialogMode | null>(
    null,
  );
  const [pendingForcedMove, setPendingForcedMove] =
    useState<PendingForcedMove | null>(null);
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

  const closeMoveDialog = useCallback(() => {
    setInvalidMoveDialogOpen(false);
    setMoveDialogMode(null);
    setPendingForcedMove(null);
  }, []);

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;

      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;

      if (!isColumnId(sourceColumnId) || !isColumnId(destinationColumnId)) {
        return;
      }

      if (
        sourceColumnId === destinationColumnId &&
        source.index === destination.index
      ) {
        return;
      }

      const ticketId = parseTicketId(result.draggableId);
      if (ticketId === null) return;

      const movedTicket = tickets.find((ticket) => ticket.id === ticketId);
      const ticketTitle = movedTicket?.title ?? `Ticket #${ticketId}`;
      const destinationLabel =
        columns.find((column) => column.id === destinationColumnId)?.label ??
        destinationColumnId;
      const groupId = `move-${ticketId}-${Date.now()}`;

      if (!canMoveToTargetColumn(sourceColumnId, destinationColumnId)) {
        setPendingForcedMove({
          ticketId,
          ticketTitle,
          destinationColumnId,
          destinationLabel,
          result,
        });
        setMoveDialogMode("forceMove");
        setInvalidMoveDialogOpen(true);
        return;
      }

      if (!movedTicket?.assigned_to_id) {
        setPendingForcedMove(null);
        setMoveDialogMode("missingAssignee");
        setInvalidMoveDialogOpen(true);
        return;
      }

      let previousTickets: TicketWithRelations[] = [];

      setTickets((prev) => {
        previousTickets = prev;
        return moveTickets(prev, result);
      });

      if (sourceColumnId === destinationColumnId) {
        return;
      }

      addToast(
        "info",
        "Déplacement en cours...",
        `${ticketTitle} est déplacé vers ${destinationLabel}`,
        3000,
        groupId,
      );

      try {
        const { error } = await updateTicket(ticketId, {
          column: destinationColumnId,
        });

        if (error) throw error;

        addToast(
          "success",
          "Déplacement réussi",
          `${ticketTitle} a été déplacé vers ${destinationLabel}`,
          3000,
          groupId,
        );
      } catch (error) {
        setTickets(previousTickets);

        addToast(
          "destructive",
          "Erreur",
          `Impossible de déplacer ${ticketTitle}`,
          3000,
          groupId,
        );
      }
    },
    [addToast, tickets],
  );

  const confirmForcedMove = useCallback(async () => {
    if (!pendingForcedMove) {
      setInvalidMoveDialogOpen(false);
      return;
    }

    const {
      ticketId,
      ticketTitle,
      destinationColumnId,
      destinationLabel,
      result,
    } = pendingForcedMove;

    const currentTicket = tickets.find((ticket) => ticket.id === ticketId);
    if (!currentTicket?.assigned_to_id) {
      setPendingForcedMove(null);
      setMoveDialogMode("missingAssignee");
      setInvalidMoveDialogOpen(true);
      return;
    }

    const groupId = `move-${ticketId}-${Date.now()}`;
    let previousTickets: TicketWithRelations[] = [];

    setInvalidMoveDialogOpen(false);
    setMoveDialogMode(null);
    setPendingForcedMove(null);

    setTickets((prev) => {
      previousTickets = prev;
      return moveTickets(prev, result);
    });

    addToast(
      "info",
      "Déplacement en cours...",
      `${ticketTitle} est déplacé vers ${destinationLabel}`,
      3000,
      groupId,
    );

    try {
      const { error } = await updateTicket(ticketId, {
        column: destinationColumnId,
      });

      if (error) throw error;

      addToast(
        "success",
        "Déplacement réussi",
        `${ticketTitle} a été déplacé vers ${destinationLabel}`,
        3000,
        groupId,
      );
    } catch (error) {
      setTickets(previousTickets);

      addToast(
        "destructive",
        "Erreur",
        `Impossible de déplacer ${ticketTitle}`,
        3000,
        groupId,
      );
    }
  }, [addToast, pendingForcedMove, tickets]);

  const cancelForcedMove = closeMoveDialog;

  return (
    <Container className="h-full w-full">
      <Dialog
        open={invalidMoveDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeMoveDialog();
            return;
          }

          setInvalidMoveDialogOpen(true);
        }}
        title="Déplacement invalide"
        description={
          moveDialogMode === "missingAssignee"
            ? "Veuillez assigner ce ticket à un utilisateur"
            : "Souhaitez vous déplacer quand même le ticket ?"
        }
        variantStyle="destructive"
        footer={
          moveDialogMode === "missingAssignee" ? (
            <Button onClick={closeMoveDialog}>Compris</Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => void confirmForcedMove()}
              >
                Déplacer quand même
              </Button>
              <Button variant="destructive" onClick={cancelForcedMove}>
                Annuler le déplacement
              </Button>
            </>
          )
        }
      />

      <div className="flex flex-row gap-4 w-full">
        <Button size={"lg"} startIcon={PlusIcon}>
          Ajouter une tâche
        </Button>
      </div>

      <DragDropContext onDragEnd={(result) => void handleDragEnd(result)}>
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
                  onAssignUser={assignUser}
                />
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </Container>
  );
};
