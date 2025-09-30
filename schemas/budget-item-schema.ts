import { z } from "zod"

export const budgetItemSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  estimatedCost: z.number().min(0, "Custo estimado deve ser positivo"),
  actualCost: z.number().min(0).optional(),
  paid: z.boolean().default(false),
})

export type BudgetItemFormData = z.infer<typeof budgetItemSchema>
