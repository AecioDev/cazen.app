// app/dashboard/page.tsx
"use client";

import { useWedding } from "@/components/providers/wedding-provider";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { TaskListWidget } from "@/components/dashboard/task-list-widget";
import { WeddingCountdown } from "@/components/dashboard/wedding-countdown";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { SetupWeddingPage } from "@/components/dashboard/setup-wedding-page"; // <-- IMPORTE AQUI

export default function DashboardPage() {
  const { wedding, tasks } = useWedding();

  // Se o usuário ainda não configurou o casamento, mostra a página de setup
  if (!wedding) {
    return <SetupWeddingPage />;
  }

  // TODO: A lógica de 'spent' virá do módulo de orçamento no futuro.
  const budgetInfo = { total: wedding.budget || 0, spent: 0 };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary">Olá, Casal!</h1>
        <p className="text-muted-foreground">
          Prontos para organizar o grande dia?
        </p>
      </div>

      <WeddingCountdown date={new Date(wedding.date)} />
      <BudgetSummaryCard budget={budgetInfo.total} spent={budgetInfo.spent} />
      <TaskListWidget tasks={tasks} />

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
