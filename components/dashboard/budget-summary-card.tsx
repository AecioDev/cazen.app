// components/dashboard/budget-summary-card.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetSummaryCardProps {
  budget: number;
  spent: number;
}

export function BudgetSummaryCard({ budget, spent }: BudgetSummaryCardProps) {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  const remaining = budget - spent;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    // Ajuste 4: Adicionando o fundo 'muted'
    <Card className="rounded-[2rem] bg-muted/80 border-none">
      <CardHeader>
        <CardTitle>Resumo do Orçamento</CardTitle>
        <CardDescription>
          Você já utilizou {percentage.toFixed(0)}% do seu orçamento.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={percentage} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Gasto: {formatCurrency(spent)}</span>
          <span>Restante: {formatCurrency(remaining)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
