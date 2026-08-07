"use client";

import * as React from "react";
import {
  UiCombobox,
  UiComboboxContent,
  UiComboboxEmpty,
  UiComboboxInput,
  UiComboboxItem,
  UiComboboxList,
} from "@/components/ux/Combobox";
import { Avatar } from "@/components/composition/Avatar";
import { highlightSubstring } from "@/lib/string";
import { type TicketWithRelations } from "../api";
import { type TicketUser } from "../api/ticket_user.api";

type KanbanCardUserSelectProps = {
  card: TicketWithRelations;
  ticketUsers: TicketUser[];
  onAssignUser: (
    ticketId: number,
    assignedToId: number | null,
  ) => Promise<void>;
};

export const KanbanCardUserSelect = ({
  card,
  ticketUsers,
  onAssignUser,
}: KanbanCardUserSelectProps) => {
  const [isAssignmentHovered, setIsAssignmentHovered] = React.useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = React.useState(false);
  const selectedUser =
    ticketUsers.find((user) => user.id === card.assigned_to_id) ?? null;
  const [assignmentSearchValue, setAssignmentSearchValue] = React.useState(
    selectedUser?.fullName ?? card.assigned_to?.fullName ?? "",
  );

  React.useEffect(() => {
    setAssignmentSearchValue(
      selectedUser?.fullName ?? card.assigned_to?.fullName ?? "",
    );
  }, [card.assigned_to?.fullName, card.assigned_to_id, selectedUser?.fullName]);

  const normalizedAssignmentQuery = assignmentSearchValue.trim().toLowerCase();
  const filteredTicketUsers = normalizedAssignmentQuery
    ? ticketUsers.filter((user) =>
        user.fullName.toLowerCase().includes(normalizedAssignmentQuery),
      )
    : ticketUsers;

  return (
    <UiCombobox
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
        onClickCapture={(event) => {
          event.stopPropagation();
        }}
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
          src={selectedUser?.profilePicture ?? card.assigned_to?.profilePicture}
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
  );
};
