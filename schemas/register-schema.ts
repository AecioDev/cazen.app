// schemas/register-schema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Por favor, insira um e-mail válido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string(), // Adicionamos o campo de confirmação
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // O erro aparecerá no campo de confirmação
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
