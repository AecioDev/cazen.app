// schemas/settings-schema.ts
import { z } from "zod";

export const settingsSchema = z.object({
  date: z.date({
    required_error: "A data do casamento é obrigatória.",
  }),
  budget: z
    .number({
      invalid_type_error: "O orçamento deve ser um número.",
    })
    .min(0, "O orçamento não pode ser negativo.")
    .default(0),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
