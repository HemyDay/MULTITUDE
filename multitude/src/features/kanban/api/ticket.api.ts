import { supabase } from "@/lib/supabase";
import { deleteById, insertOne, updateById } from "@/lib/supabase-crud";
import { TicketUser } from "./ticket_user.api";
import { TicketProject } from "./ticket_project.api";

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
