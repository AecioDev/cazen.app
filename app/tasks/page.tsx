// app/tasks/page.tsx

import { PageViewLayout } from "@/components/layout/page-view-layout";
import { TasksView } from "@/components/tasks/tasks-view";

export default function TasksPage() {
  return (
    <PageViewLayout
      title="Checklist de Tarefas"
      subtitle="Acompanhe cada passo do seu planejamento"
    >
      <TasksView />
    </PageViewLayout>
  );
}
