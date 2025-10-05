// hooks/use-vendors-crud.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Vendor, Wedding } from "@/interfaces/wedding";
import { Task } from "@/interfaces/wedding";

type FullWedding = Wedding & {
  tasks: Task[];
  vendors: Vendor[];
};

type VendorCrudProps = {
  setWedding: React.Dispatch<React.SetStateAction<FullWedding | null>>;
};

export function useVendorsCrud({ setWedding }: VendorCrudProps) {
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNÇÃO DE CRIAR FORNECEDOR ---
  // A CORREÇÃO ESTÁ AQUI NA ASSINATURA DA FUNÇÃO:
  const createVendor = async (
    vendorData: Omit<Vendor, "id" | "createdAt" | "updatedAt">
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) throw new Error("Falha ao criar o fornecedor.");

      const newVendor = await response.json();
      setWedding((prev) =>
        prev ? { ...prev, vendors: [...prev.vendors, newVendor] } : null
      );
      toast.success("Fornecedor adicionado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao criar fornecedor", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNÇÃO DE ATUALIZAR FORNECEDOR ---
  const updateVendor = async (
    vendorId: string,
    vendorData: Partial<Omit<Vendor, "id">>
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/vendors/${vendorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) throw new Error("Falha ao atualizar o fornecedor.");

      const updatedVendor = await response.json();
      setWedding((prev) =>
        prev
          ? {
              ...prev,
              vendors: prev.vendors.map((vendor) =>
                vendor.id === vendorId ? updatedVendor : vendor
              ),
            }
          : null
      );
      toast.success("Fornecedor atualizado!");
    } catch (error: any) {
      toast.error("Erro ao atualizar fornecedor", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNÇÃO DE DELETAR FORNECEDOR ---
  const deleteVendor = async (vendorId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/vendors/${vendorId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Falha ao deletar o fornecedor.");

      setWedding((prev) =>
        prev
          ? {
              ...prev,
              vendors: prev.vendors.filter((vendor) => vendor.id !== vendorId),
            }
          : null
      );
      toast.success("Fornecedor deletado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao deletar fornecedor", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { createVendor, updateVendor, deleteVendor, isLoading };
}
