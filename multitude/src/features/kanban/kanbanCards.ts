export type ColumnId =
  | "todo"
  | "inDevelopment"
  | "toReview"
  | "toTest"
  | "inTest"
  | "done";

export type KanbanItem = {
  id: string;
  title: string;
};

export const initialKanbanCardsByColumn: Record<ColumnId, KanbanItem[]> = {
  todo: [
    { id: "todo-1", title: "Define sprint goals" },
    { id: "todo-2", title: "Write API contract" },
  ],
  inDevelopment: [{ id: "dev-1", title: "Implement auth flow" }],
  toReview: [{ id: "review-1", title: "Review kanban layout" }],
  toTest: [{ id: "test-1", title: "Prepare integration tests" }],
  inTest: [{ id: "intest-1", title: "Run regression suite" }],
  done: [{ id: "done-1", title: "Project bootstrap" }],
};
