import { deleteById, insertOne, updateById } from "@/lib/supabase-crud";

export type TicketUser = {
  id: number;
  fullName: string;
  profilePicture: string | null;
};

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
