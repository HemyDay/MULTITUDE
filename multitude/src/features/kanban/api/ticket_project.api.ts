import { supabase } from "@/lib/supabase";

export type TicketProject = {
  id: number;
  name: string;
  color: string | null;
};

export const findAllTicketProjects = async () => {
  const { data, error } = await supabase.from("ticket_project").select("*");
  return { data: data as TicketProject[] | null, error };
};
