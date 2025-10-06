// components/settings/settings-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsFormData, settingsSchema } from "@/schemas/settings-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useWedding } from "@/components/providers/wedding-provider";
import { CurrencyInput } from "@/components/ui/currency-input";
import { DatePicker } from "@/components/ui/date-picker";

export function SettingsForm() {
  const { wedding, updateWedding, isLoadingWedding } = useWedding();
  const router = useRouter();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    // Preenche o formulário com os dados atuais do casamento
    defaultValues: {
      date: wedding ? new Date(wedding.date) : new Date(),
      budget: wedding ? wedding.budget : 0,
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    await updateWedding(data);
    // Opcional: redirecionar de volta para o dashboard após salvar
    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data do Casamento (O Dia D!)</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orçamento Total Previsto (R$)</FormLabel>
              <FormControl>
                <CurrencyInput
                  placeholder="R$ 25.000,00"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoadingWedding}>
          {isLoadingWedding ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </form>
    </Form>
  );
}
