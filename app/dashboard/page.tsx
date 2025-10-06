// app/dashboard/page.tsx
"use client";

import { useWedding } from "@/components/providers/wedding-provider";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { TaskListWidget } from "@/components/dashboard/task-list-widget";
import { WeddingCountdown } from "@/components/dashboard/wedding-countdown";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { SetupWeddingPage } from "@/components/dashboard/setup-wedding-page";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardPage() {
  const { wedding, tasks } = useWedding();

  if (!wedding) {
    return <SetupWeddingPage />;
  }

  const budgetInfo = { total: wedding.budget || 0, spent: 0 };

  return (
    <div className="flex flex-col">
      {/* Seção Superior (Colorida) */}
      <div className="bg-primary p-4 space-y-6 pb-16">
        <DashboardHeader />
        <WeddingCountdown date={new Date(wedding.date)} />
      </div>

      {/* Seção Inferior (Conteúdo Principal) */}
      {/* Ajustes 1 e 2: Aumentamos a margem negativa e o padding-top */}
      <div className="rounded-t-[2.5rem] bg-background -mt-8 pt-8 p-4 space-y-6">
        <BudgetSummaryCard budget={budgetInfo.total} spent={budgetInfo.spent} />
        <TaskListWidget tasks={tasks} />

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Link href="/vendors" passHref>
            <Button
              variant="outline"
              className="h-24 w-full flex-col gap-2 text-muted-foreground"
            >
              <Icon icon="mdi:store-outline" className="h-8 w-8" />
              <span>Fornecedores</span>
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
    </div>
  );
}
