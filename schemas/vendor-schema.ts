import { z } from "zod"

export const vendorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  contact: z.string().min(1, "Contato é obrigatório"),
  email: z.string().email("Email inválido").optional(),
  phone: z.string().optional(),
  cost: z.number().min(0, "Custo deve ser positivo"),
  paid: z.boolean().default(false),
})

export type VendorFormData = z.infer<typeof vendorSchema>
