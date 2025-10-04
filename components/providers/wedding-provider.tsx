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
import { Task } from "@/interfaces/wedding";
import { useTasksCrud } from "@/hooks/use-tasks-crud";
import { AppLoader } from "../layout/app-loader";
import { toast } from "sonner";

// Tipagem para o contexto
interface WeddingContextType {
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
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializa o nosso hook de CRUD
  const {
    createTask,
    updateTask,
    deleteTask,
    isLoading: isLoadingCrud,
  } = useTasksCrud({ setTasks });

  useEffect(() => {
    // Busca os dados iniciais apenas se o usuário estiver autenticado
    if (status === "authenticated") {
      const fetchInitialData = async () => {
        setIsLoading(true);
        try {
          // Futuramente, podemos buscar todos os dados (fornecedores, orçamento) aqui
          const tasksResponse = await fetch("/api/tasks");
          if (!tasksResponse.ok) throw new Error("Falha ao buscar tarefas.");
          const tasksData = await tasksResponse.json();
          setTasks(tasksData);
        } catch (error) {
          console.error("Erro ao buscar dados iniciais:", error);
          toast.error("Não foi possível carregar os dados do seu casamento.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitialData();
    } else if (status === "unauthenticated") {
      // Se deslogado, limpa os dados e para de carregar
      setIsLoading(false);
      setTasks([]);
    }
  }, [status]);

  // Enquanto busca os dados iniciais, exibe um loader
  if (isLoading) {
    return <AppLoader message="Carregando dados do seu casamento..." />;
  }

  const value = {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    isLoadingTasks: isLoadingCrud,
  };

  return (
    <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>
  );
}
