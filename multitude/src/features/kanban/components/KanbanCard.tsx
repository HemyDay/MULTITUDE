"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import {
  UiCombobox,
  UiComboboxContent,
  UiComboboxEmpty,
  UiComboboxInput,
  UiComboboxItem,
  UiComboboxList,
} from "@/components/ux/Combobox";
import { Badge } from "@/components/composition/Badge";
import { Avatar } from "@/components/composition/Avatar";
import { Progress } from "@/components/composition/Progress";
import { type TicketUser, type TicketWithRelations } from "../api";
import { highlightSubstring } from "@/lib/string";

type KanbanCardProps = {
  card: TicketWithRelations;
  isDragging?: boolean;
  ticketUsers: TicketUser[];
  onAssignUser: (
    ticketId: number,
    assignedToId: number | null,
  ) => Promise<void>;
};

export const KanbanCard = ({
  card,
  isDragging = false,
  ticketUsers,
  onAssignUser,
}: KanbanCardProps) => {
  const canEditAssignedTo = card.column === "todo";
  const shouldHideEstimate = ["toReview", "toTest", "inTest", "done"].includes(
    card.column ?? "",
  );
  const [isAssignmentHovered, setIsAssignmentHovered] = React.useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = React.useState(false);
  const selectedUser =
    ticketUsers.find((user) => user.id === card.assigned_to_id) ?? null;
  const [assignmentSearchValue, setAssignmentSearchValue] = React.useState(
    selectedUser?.fullName ?? card.assigned_to?.fullName ?? "",
  );
  const normalizedAssignmentQuery = assignmentSearchValue.trim().toLowerCase();
  const filteredTicketUsers = normalizedAssignmentQuery
    ? ticketUsers.filter((user) =>
        user.fullName.toLowerCase().includes(normalizedAssignmentQuery),
      )
    : ticketUsers;

  const estimate = card.estimate ?? 0;
  const remaining = card.remaining ?? 0;
  const progressValue =
    estimate > 0
      ? Math.max(0, Math.min(100, ((estimate - remaining) / estimate) * 100))
      : 0;

  return (
    <div
      className="group rounded-lg p-4 border-primary border flex flex-col gap-4 bg-surface"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <div className="flex flex-row justify-between">
        <Badge colorHex={card.project?.color || "#FC6E51"} className="text-xs">
          {card.project?.name}
        </Badge>
        {!shouldHideEstimate && (
          <div className="flex flex-row gap-1 text-xs items-center text-muted-foreground">
            <span>{card.estimate ?? 0}h</span>{" "}
            <Clock size={12} className="stroke-muted-foreground" />
          </div>
        )}
      </div>
      <div className="text-sm font-bold text-foreground group-hover:text-primary">
        {card.id} - {card.title ?? "Untitled ticket"}
      </div>

      {canEditAssignedTo ? (
        <UiCombobox
          key={`${card.id}-${card.assigned_to_id ?? "none"}`}
          value={card.assigned_to_id?.toString() ?? null}
          open={isAssignmentOpen}
          onOpenChange={setIsAssignmentOpen}
          onValueChange={(value) => {
            void (async () => {
              const assignedToId = value ? Number(value) : null;
              await onAssignUser(card.id, assignedToId);
              const nextUser =
                ticketUsers.find((user) => user.id === assignedToId) ?? null;
              setAssignmentSearchValue(nextUser?.fullName ?? "");
            })();
          }}
        >
          <div
            className="group/assignment-combobox flex flex-row gap-1 items-center text-xs min-h-5"
            onMouseEnter={() => {
              setIsAssignmentHovered(true);
            }}
            onMouseLeave={() => {
              setIsAssignmentHovered(false);
            }}
            onMouseDownCapture={(event) => {
              event.stopPropagation();
            }}
          >
            <Avatar
              src={
                selectedUser?.profilePicture ?? card.assigned_to?.profilePicture
              }
              name={selectedUser?.fullName ?? card.assigned_to?.fullName}
              className="w-5 h-5"
            />
            <UiComboboxInput
              aria-label="Affecter à un utilisateur"
              showClear={isAssignmentHovered}
              showTrigger={false}
              value={assignmentSearchValue}
              placeholder={selectedUser?.fullName ?? "Unassigned"}
              className="h-6 px-1 w-full border-transparent hover:border-input focus-within:border-ring bg-transparent shadow-none 
              **:data-[slot=input-group-control]:h-6 
              **:data-[slot=input-group-control]:text-xs "
              onFocus={() => {
                if (
                  !selectedUser &&
                  !card.assigned_to_id &&
                  !assignmentSearchValue.trim()
                ) {
                  setIsAssignmentOpen(true);
                }
              }}
              onChange={(event) => {
                setAssignmentSearchValue(event.target.value);
              }}
              onBlur={() => {
                setIsAssignmentOpen(false);
                setAssignmentSearchValue(
                  selectedUser?.fullName ?? card.assigned_to?.fullName ?? "",
                );
              }}
            />
          </div>
          <UiComboboxContent side="bottom" align="start">
            <UiComboboxList>
              {filteredTicketUsers.length > 0 ? (
                filteredTicketUsers.map((user) => (
                  <UiComboboxItem key={user.id} value={user.id.toString()}>
                    <Avatar
                      src={user.profilePicture}
                      name={user.fullName}
                      className="w-5 h-5"
                    />
                    <span
                      className="text-xs"
                      dangerouslySetInnerHTML={{
                        __html: highlightSubstring(
                          user.fullName,
                          assignmentSearchValue,
                        ),
                      }}
                    ></span>
                  </UiComboboxItem>
                ))
              ) : (
                <UiComboboxEmpty className="text-xs">
                  Aucun utilisateur trouvé
                </UiComboboxEmpty>
              )}
            </UiComboboxList>
          </UiComboboxContent>
        </UiCombobox>
      ) : (
        <div className="flex flex-row gap-2 items-center text-xs min-h-5">
          <Avatar
            src={card.assigned_to?.profilePicture}
            name={card.assigned_to?.fullName}
            className="w-5 h-5"
          />
          <span>{card.assigned_to?.fullName ?? "Unassigned"}</span>
        </div>
      )}

      {card.column === "inDevelopment" ? (
        <div className="mt-auto flex flex-row items-center gap-2">
          <Progress value={progressValue} className="h-1.5" />
          <span className="text-xs text-muted-foreground w-11 text-right">
            {Math.round(progressValue)}%
          </span>
        </div>
      ) : null}
    </div>
  );
};
