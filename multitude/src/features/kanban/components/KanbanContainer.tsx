"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/composition/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/composition/Carousel";
import { Container } from "@/components/composition/Container";
import { Dialog } from "@/components/composition/Dialog";
import { useToasts } from "@/components/layout/Toasts";
import {
  findAllTickets,
  deleteTicket,
  updateTicket,
  type TicketWithRelations,
} from "@/features/kanban/api";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { cn } from "@/lib/utils";

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

const getNextColumnId = (columnId: ColumnId): ColumnId | null => {
  const currentIndex = columns.findIndex((column) => column.id === columnId);
  const nextColumn = columns[currentIndex + 1];

  return nextColumn?.id ?? null;
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
  const isMobile = useIsMobile();
  const { addToast } = useToasts();
  const [tickets, setTickets] = useState<TicketWithRelations[]>([]);
  const [ticketUsers, setTicketUsers] = useState<TicketUser[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);
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

  useEffect(() => {
    if (!carouselApi || !isMobile) return;

    const syncActiveIndex = () => {
      setActiveColumnIndex(carouselApi.selectedScrollSnap());
    };

    syncActiveIndex();
    carouselApi.on("select", syncActiveIndex);
    carouselApi.on("reInit", syncActiveIndex);

    return () => {
      carouselApi.off("select", syncActiveIndex);
      carouselApi.off("reInit", syncActiveIndex);
    };
  }, [carouselApi, isMobile]);

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

  const moveTicketToNextColumn = useCallback(
    async (ticketId: number) => {
      const movedTicket = tickets.find((ticket) => ticket.id === ticketId);
      if (!movedTicket?.column || !isColumnId(movedTicket.column)) {
        return;
      }

      const sourceColumnId = movedTicket.column;
      const destinationColumnId = getNextColumnId(sourceColumnId);
      if (!destinationColumnId) {
        return;
      }

      if (!movedTicket.assigned_to_id) {
        setPendingForcedMove(null);
        setMoveDialogMode("missingAssignee");
        setInvalidMoveDialogOpen(true);
        return;
      }

      const sourceTickets = tickets.filter(
        (ticket) => ticket.column === sourceColumnId,
      );
      const destinationTickets = tickets.filter(
        (ticket) => ticket.column === destinationColumnId,
      );
      const sourceIndex = sourceTickets.findIndex(
        (ticket) => ticket.id === ticketId,
      );
      if (sourceIndex === -1) {
        return;
      }

      const result: DropResult = {
        draggableId: `ticket-${ticketId}`,
        type: "DEFAULT",
        source: {
          droppableId: sourceColumnId,
          index: sourceIndex,
        },
        destination: {
          droppableId: destinationColumnId,
          index: destinationTickets.length,
        },
        reason: "DROP",
        mode: "FLUID",
        combine: null,
      };

      const ticketTitle = movedTicket.title ?? `Ticket #${ticketId}`;
      const destinationLabel =
        columns.find((column) => column.id === destinationColumnId)?.label ??
        destinationColumnId;
      const groupId = `move-${ticketId}-${Date.now()}`;
      let previousTickets: TicketWithRelations[] = [];

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
    },
    [addToast, tickets],
  );

  const removeTicket = useCallback(
    async (ticketId: number) => {
      const ticket = tickets.find(
        (currentTicket) => currentTicket.id === ticketId,
      );
      if (!ticket) return;

      setTickets((previousTickets) =>
        previousTickets.filter(
          (currentTicket) => currentTicket.id !== ticketId,
        ),
      );

      try {
        const { error } = await deleteTicket(ticketId);
        if (error) throw error;

        addToast(
          "success",
          "Suppression réussie",
          `${ticket.title ?? `Ticket #${ticketId}`} a été supprimé`,
          3000,
        );
      } catch (error) {
        setTickets((previousTickets) => [ticket, ...previousTickets]);
        addToast(
          "destructive",
          "Erreur",
          `Impossible de supprimer ${ticket.title ?? `Ticket #${ticketId}`}`,
          3000,
        );
      }
    },
    [addToast, tickets],
  );

  const cancelForcedMove = closeMoveDialog;

  const renderColumnLane = useCallback(
    (column: KanbanColumn) => {
      const Icon = column.icon;

      return (
        <div
          className={cn(
            "flex w-full flex-1 flex-col gap-4 h-full min-h-0 overflow-hidden p-4 bg-grey rounded-[8px]",
            isMobile ? "pr-4" : "pr-1",
          )}
        >
          <div className="flex uppercase text-base flex-row gap-2 items-center justify-start">
            <Icon size={16} />
            <span className="select-none">{column.label}</span>
          </div>
          <KanbanColumnLane
            columnId={column.id}
            cards={tickets.filter((ticket) => ticket.column === column.id)}
            ticketUsers={ticketUsers}
            onAssignUser={assignUser}
            onMoveToNextColumn={moveTicketToNextColumn}
            onDeleteTicket={removeTicket}
          />
        </div>
      );
    },
    [assignUser, moveTicketToNextColumn, removeTicket, ticketUsers, tickets],
  );

  return (
    <Container className="h-full min-h-0 w-full items-stretch overflow-hidden">
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
            <Button
              className="flex-1 w-full"
              variant="outline"
              onClick={closeMoveDialog}
            >
              Compris
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex-1 w-full"
                onClick={() => void confirmForcedMove()}
              >
                Déplacer quand même
              </Button>
              <Button
                variant="destructive"
                className="flex-1 w-full"
                onClick={cancelForcedMove}
              >
                Annuler le déplacement
              </Button>
            </>
          )
        }
      />

      <div className="hidden md:flex flex-row gap-4 w-full">
        <Button size={"lg"} startIcon={PlusIcon}>
          Ajouter une tâche
        </Button>
      </div>

      <DragDropContext onDragEnd={(result) => void handleDragEnd(result)}>
        {isMobile ? (
          <div className="w-full min-h-0 flex flex-1 flex-col overflow-hidden">
            <div className="relative w-full min-h-0 flex-1">
              <Carousel
                className="w-full h-full min-h-0 touch-pan-x *:data-[slot=carousel-content]:h-full"
                setApi={setCarouselApi}
              >
                <CarouselContent className="ml-0 h-full min-h-0">
                  {columns.map((column) => (
                    <CarouselItem
                      key={column.id}
                      className="pl-0 h-full min-h-0 flex"
                    >
                      {renderColumnLane(column)}
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="absolute inset-x-0 bottom-2 z-10 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                  {columns.map((column, index) => {
                    const isActive = index === activeColumnIndex;

                    return (
                      <button
                        key={column.id}
                        type="button"
                        aria-label={`Aller à la colonne ${column.label}`}
                        aria-current={isActive}
                        onClick={() => carouselApi?.scrollTo(index)}
                        className={`h-2.5 rounded-full ring-1 ring-foreground/20 transition-all ${
                          isActive
                            ? "w-6 bg-primary"
                            : "w-2.5 bg-muted-foreground/45 hover:bg-muted-foreground/70"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full min-h-0 grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((column) => (
              <div key={column.id} className="min-w-0 h-full min-h-0">
                {renderColumnLane(column)}
              </div>
            ))}
          </div>
        )}
      </DragDropContext>
    </Container>
  );
};
