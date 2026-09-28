import { supabase } from "@/lib/supabase";

type QueryValue = string | number | boolean | null;
type RowId = string | number;

export const findAll = async <TRow>(table: string) => {
  const query = supabase.from(table).select("*");
  return query as PromiseLike<{ data: TRow[] | null; error: unknown }>;
};

export const findBy = async <TRow>(
  table: string,
  filters: Record<string, QueryValue>,
) => {
  let query = supabase.from(table).select("*");

  for (const [column, value] of Object.entries(filters)) {
    query = query.eq(column, value);
  }

  return query as PromiseLike<{ data: TRow[] | null; error: unknown }>;
};

export const insertOne = async <TInsert extends Record<string, unknown>, TRow>(
  table: string,
  payload: TInsert,
) => {
  const query = supabase.from(table).insert(payload).select().single();
  return query as PromiseLike<{ data: TRow | null; error: unknown }>;
};

export const updateById = async <TRow>(
  table: string,
  id: RowId,
  payload: Record<string, unknown>,
) => {
  const query = supabase
    .from(table)
    .update(payload as never)
    .eq("id", id)
    .select()
    .single();

  return query as PromiseLike<{ data: TRow | null; error: unknown }>;
};

export const deleteById = async (table: string, id: RowId) => {
  const query = supabase.from(table).delete().eq("id", id);
  return query as PromiseLike<{ error: unknown }>;
};
