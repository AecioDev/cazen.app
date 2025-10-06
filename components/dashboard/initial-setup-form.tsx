// components/dashboard/initial-setup-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsFormData, settingsSchema } from "@/schemas/settings-schema";
import { useWedding } from "../providers/wedding-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { useState } from "react";
import { CurrencyInput } from "../ui/currency-input";
import { DatePicker } from "../ui/date-picker";

export function InitialSetupForm() {
  const { setWedding } = useWedding();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      budget: 10000,
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/wedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Falha ao criar o casamento inicial.");

      const newWedding = await response.json();
      setWedding(newWedding);
      toast.success("Seu casamento foi configurado! Bem-vindo(a)!");
      router.replace("/dashboard");
    } catch (error: any) {
      toast.error("Erro ao configurar o casamento", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-sm"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quando será o Grande Dia?</FormLabel>
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
              <FormLabel>Qual o orçamento total previsto?</FormLabel>
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Começar a Planejar"}
        </Button>
      </form>
    </Form>
  );
}
