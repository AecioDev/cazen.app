// components/vendors/vendor-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VendorFormData, vendorSchema } from "@/schemas/vendor-schema";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { vendorCategories } from "@/lib/data/defaults";
import { useWedding } from "../providers/wedding-provider";
import { CurrencyInput } from "../ui/currency-input";
import { StarRating } from "../ui/star-rating";
import { Vendor } from "@/interfaces/wedding";
import { useEffect } from "react";

interface VendorFormProps {
  initialData?: Vendor | null;
  onFinished?: () => void;
}

export function VendorForm({ initialData, onFinished }: VendorFormProps) {
  const { createVendor, updateVendor, isLoadingVendors } = useWedding();
  const isEditing = !!initialData;

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      contactName: initialData?.contactName || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      cost: initialData?.cost || 0,
      notes: initialData?.notes || "",
      rating: initialData?.rating || 0,
    },
  });

  useEffect(() => {
    form.reset({
      name: initialData?.name || "",
      category: initialData?.category || "",
      contactName: initialData?.contactName || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      cost: initialData?.cost || 0,
      notes: initialData?.notes || "",
      rating: initialData?.rating || 0,
    });
  }, [initialData, form]);

  const onSubmit = async (data: VendorFormData) => {
    if (isEditing && initialData) {
      // Modo Edição
      await updateVendor(initialData.id, data);
    } else {
      // Modo Criação
      const dataToSubmit = { ...data, paid: false };
      await createVendor(dataToSubmit);
    }
    form.reset();
    onFinished?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vendorCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Fornecedor/Serviço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Doce de Mãe Bolos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Possibilidade de Fechamento</FormLabel>
              <FormControl>
                <StarRating
                  rating={field.value}
                  onRatingChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custo Estimado (R$)</FormLabel>
              <FormControl>
                <CurrencyInput
                  placeholder="R$ 0,00"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Contato</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Maria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="(67) 99999-9999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anotações</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalhes do contrato, observações importantes, etc."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoadingVendors}>
          {isLoadingVendors
            ? "Salvando..."
            : isEditing
            ? "Salvar Alterações"
            : "Salvar Fornecedor"}
        </Button>
      </form>
    </Form>
  );
}
