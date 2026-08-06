import { NextResponse } from "next/server";

import type { TicketUser } from "@/features/kanban/api";

const SUPABASE_REST_URL =
  "https://inxlerxhvevovxmvjoah.supabase.co/rest/v1/ticket_user";

export async function GET() {
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseKey) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${SUPABASE_REST_URL}?select=id,fullName,profilePicture`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: `Supabase request failed with status ${response.status}` },
      { status: response.status },
    );
  }

  const users = (await response.json()) as TicketUser[];
  return NextResponse.json(users);
}
