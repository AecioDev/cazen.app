// schemas/vendor-schema.ts
import { z } from "zod";

export const vendorSchema = z.object({
  name: z.string().min(3, { message: "O nome do fornecedor é obrigatório." }),
  category: z.string().min(1, { message: "Selecione uma categoria." }),
  contactName: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .email({ message: "Por favor, insira um e-mail válido." })
    .optional()
    .or(z.literal("")),
  cost: z
    .number({ invalid_type_error: "O custo deve ser um número." })
    .min(0, "O custo não pode ser um valor negativo.")
    .default(0),
  rating: z.number().min(0).max(5).default(0),
  notes: z.string().optional(),
});

export type VendorFormData = z.infer<typeof vendorSchema>;
