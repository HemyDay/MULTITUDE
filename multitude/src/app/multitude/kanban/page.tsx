import MainLayout from "@/components/layout/MainLayout";
import { KanbanContainer } from "@/features/kanban/KanbanContainer";

export default function KanbanPage() {
  return (
    <MainLayout theme="theme-dark-blue">
      <KanbanContainer />
    </MainLayout>
  );
}
