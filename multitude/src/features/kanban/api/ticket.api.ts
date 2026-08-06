import { supabase } from "@/lib/supabase";
import { deleteById, insertOne, updateById } from "@/lib/supabase-crud";

export type TicketUser = {
  id: number;
  fullName: string;
  profilePicture: string | null;
};

export type TicketProject = {
  id: number;
  name: string;
  color: string | null;
};

export type Ticket = {
  id: number;
  title: string | null;
  description: string | null;
  estimate: number | null;
  remaining: number | null;
  column: string | null;
  author_id: number | null;
  assigned_to_id: number | null;
  project_id: number | null;
};

export type TicketWithRelations = Ticket & {
  author: TicketUser | null;
  assigned_to: TicketUser | null;
  project: TicketProject | null;
};

// --- TicketUser ---

export const findAllTicketUsers = async () => {
  try {
    const response = await fetch("/api/ticket-user", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ticket users: ${response.status}`);
    }

    const data = (await response.json()) as TicketUser[];
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const insertTicketUser = async (payload: Omit<TicketUser, "id">) =>
  insertOne<Omit<TicketUser, "id">, TicketUser>("ticket_user", payload);

export const updateTicketUser = async (
  id: number,
  payload: Partial<Omit<TicketUser, "id">>,
) => updateById<TicketUser>("ticket_user", id, payload);

export const deleteTicketUser = async (id: number) =>
  deleteById("ticket_user", id);

// --- TicketProject ---

export const findAllTicketProjects = async () => {
  const { data, error } = await supabase.from("ticket_project").select("*");
  return { data: data as TicketProject[] | null, error };
};

export const insertTicketProject = async (payload: Omit<TicketProject, "id">) =>
  insertOne<Omit<TicketProject, "id">, TicketProject>(
    "ticket_project",
    payload,
  );

export const updateTicketProject = async (
  id: number,
  payload: Partial<Omit<TicketProject, "id">>,
) => updateById<TicketProject>("ticket_project", id, payload);

export const deleteTicketProject = async (id: number) =>
  deleteById("ticket_project", id);

// --- Ticket ---

export const findAllTickets = async () => {
  const { data, error } = await supabase
    .from("ticket")
    .select(
      `*, author:ticket_user!ticket_author_id_fkey(*), assigned_to:ticket_user!ticket_assigned_to_id_fkey(*), project:ticket_project(*)`,
    );
  return { data: data as TicketWithRelations[] | null, error };
};

export const findTicketById = async (id: number) => {
  const { data, error } = await supabase
    .from("ticket")
    .select(
      `*, author:ticket_user!ticket_author_id_fkey(*), assigned_to:ticket_user!ticket_assigned_to_id_fkey(*), project:ticket_project(*)`,
    )
    .eq("id", id)
    .single();
  return { data: data as TicketWithRelations | null, error };
};

export const insertTicket = async (payload: Omit<Ticket, "id">) =>
  insertOne<Omit<Ticket, "id">, Ticket>("ticket", payload);

export const updateTicket = async (
  id: number,
  payload: Partial<Omit<Ticket, "id">>,
) => updateById<Ticket>("ticket", id, payload);

export const deleteTicket = async (id: number) => deleteById("ticket", id);
