// hooks/use-wedding-crud.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Wedding, Task, Vendor } from "@/interfaces/wedding";

type FullWedding = Wedding & {
  tasks: Task[];
  vendors: Vendor[];
};

type WeddingCrudProps = {
  setWedding: React.Dispatch<React.SetStateAction<FullWedding | null>>;
};

export function useWeddingCrud({ setWedding }: WeddingCrudProps) {
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNÇÃO DE ATUALIZAR O CASAMENTO (DATA E ORÇAMENTO) ---
  const updateWedding = async (
    weddingData: Partial<{ date: Date; budget: number }>
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/wedding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(weddingData),
      });

      if (!response.ok) throw new Error("Falha ao atualizar as configurações.");

      const updatedWedding = await response.json();
      setWedding(updatedWedding); // Atualiza o estado global com os novos dados
      toast.success("Configurações salvas com sucesso!");
      return updatedWedding; // Retorna os dados atualizados para quem chamou
    } catch (error: any) {
      toast.error("Erro ao salvar configurações", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateWedding, isLoading };
}
