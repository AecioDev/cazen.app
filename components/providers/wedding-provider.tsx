// components/providers/wedding-provider.tsx
"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Task, Vendor, Wedding } from "@/interfaces/wedding";
import { useTasksCrud } from "@/hooks/use-tasks-crud";
import { AppLoader } from "../layout/app-loader";
import { toast } from "sonner";
import { useVendorsCrud } from "@/hooks/use-vendors-crud"; // <-- 1. Importe o novo hook

// Agora nosso tipo completo inclui tarefas e fornecedores
type FullWedding = Wedding & {
  tasks: Task[];
  vendors: Vendor[];
};

interface WeddingContextType {
  wedding: FullWedding | null;
  setWedding: React.Dispatch<React.SetStateAction<FullWedding | null>>;
  // Funções de Tarefas
  tasks: Task[];
  createTask: (
    taskData: Omit<Task, "id" | "completed" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTask: (
    taskId: string,
    taskData: Partial<Omit<Task, "id">>
  ) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  isLoadingTasks: boolean;
  // Funções de Fornecedores
  vendors: Vendor[];
  createVendor: (
    vendorData: Omit<Vendor, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateVendor: (
    vendorId: string,
    vendorData: Partial<Omit<Vendor, "id">>
  ) => Promise<void>;
  deleteVendor: (vendorId: string) => Promise<void>;
  isLoadingVendors: boolean;
}

const WeddingContext = createContext<WeddingContextType | null>(null);

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error("useWedding deve ser usado dentro de um WeddingProvider");
  }
  return context;
};

export function WeddingProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [wedding, setWedding] = useState<FullWedding | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializa ambos os hooks
  const {
    createTask,
    updateTask,
    deleteTask,
    isLoading: isLoadingTasks,
  } = useTasksCrud({ setWedding });
  const {
    createVendor,
    updateVendor,
    deleteVendor,
    isLoading: isLoadingVendors,
  } = useVendorsCrud({ setWedding }); // <-- 2. Use o novo hook

  useEffect(() => {
    if (status === "authenticated") {
      const fetchInitialData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("/api/wedding"); // A API já busca tudo
          if (!response.ok) throw new Error("Falha ao buscar dados.");
          const data = await response.json();
          setWedding(data);
        } catch (error) {
          console.error("Erro ao buscar dados iniciais:", error);
          toast.error("Não foi possível carregar os dados do seu casamento.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitialData();
    } else if (status === "unauthenticated") {
      setIsLoading(false);
      setWedding(null);
    }
  }, [status]);

  if (isLoading) {
    return <AppLoader message="Carregando dados do seu casamento..." />;
  }

  const value = {
    wedding,
    setWedding,
    // Tarefas
    tasks: wedding?.tasks || [],
    createTask,
    updateTask,
    deleteTask,
    isLoadingTasks,
    // Fornecedores
    vendors: wedding?.vendors || [], // <-- 3. Adicione os vendors ao contexto
    createVendor,
    updateVendor,
    deleteVendor,
    isLoadingVendors,
  };

  return (
    <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>
  );
}
