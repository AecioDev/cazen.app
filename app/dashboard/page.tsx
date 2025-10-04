// app/dashboard/page.tsx

import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { TaskListWidget } from "@/components/dashboard/task-list-widget";
import { WeddingCountdown } from "@/components/dashboard/wedding-countdown";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function DashboardPage() {
  // Dados mocados (substituiremos por dados reais do banco no futuro)
  const weddingDate = new Date("2025-10-25T17:00:00");
  const budget = { total: 50000, spent: 15000 };
  const tasks = [
    { id: "1", title: "Definir lista de convidados", completed: false },
    { id: "2", title: "Contratar cerimonial", completed: true },
    { id: "3", title: "Enviar Save the Date", completed: false },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Seção de Boas-vindas */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary">Olá, Casal!</h1>
        <p className="text-muted-foreground">
          Prontos para organizar o grande dia?
        </p>
      </div>

      {/* Componentes Principais */}
      <WeddingCountdown date={weddingDate} />
      <BudgetSummaryCard budget={budget.total} spent={budget.spent} />
      <TaskListWidget tasks={tasks} />

      {/* Seção de Atalhos Rápidos */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <Link href="/guests" passHref>
          <Button
            variant="outline"
            className="h-24 w-full flex-col gap-2 text-muted-foreground"
          >
            <Icon icon="mdi:account-group-outline" className="h-8 w-8" />
            <span>Convidados</span>
          </Button>
        </Link>
        <Link href="/vendors" passHref>
          <Button
            variant="outline"
            className="h-24 w-full flex-col gap-2 text-muted-foreground"
          >
            <Icon icon="mdi:store-outline" className="h-8 w-8" />
            <span>Fornecedores</span>
          </Button>
        </Link>
        <Link href="/budget" passHref>
          <Button
            variant="outline"
            className="h-24 w-full flex-col gap-2 text-muted-foreground"
          >
            <Icon icon="mdi:cash-multiple" className="h-8 w-8" />
            <span>Orçamento</span>
          </Button>
        </Link>
        <Link href="/tasks" passHref>
          <Button
            variant="outline"
            className="h-24 w-full flex-col gap-2 text-muted-foreground"
          >
            <Icon icon="mdi:check-circle-outline" className="h-8 w-8" />
            <span>Tarefas</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
