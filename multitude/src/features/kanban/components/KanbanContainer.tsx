"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/composition/Button";
import { Container } from "@/components/composition/Container";
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

export const KanbanContainer = () => {
  const { addToast } = useToasts();
  const [tickets, setTickets] = useState<TicketWithRelations[]>([]);
  const [ticketUsers, setTicketUsers] = useState<TicketUser[]>([]);
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

  return (
    <Container className="h-full w-full">
      <div className="flex flex-row gap-4 w-full">
        <Button size={"lg"} startIcon={PlusIcon}>
          Ajouter une tâche
        </Button>
      </div>

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
                cards={tickets.filter((ticket) => ticket.column === column.id)}
                ticketUsers={ticketUsers}
                onAssignUser={assignUser}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};
