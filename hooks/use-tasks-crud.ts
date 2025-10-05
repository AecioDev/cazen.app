// hooks/use-tasks-crud.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Task, Wedding } from "@/interfaces/wedding";

type FullWedding = Wedding & {
  tasks: Task[];
};

// As funções do hook receberão o 'setter' do estado principal do Provider
type TaskCrudProps = {
  setWedding: React.Dispatch<React.SetStateAction<FullWedding | null>>;
};

export function useTasksCrud({ setWedding }: TaskCrudProps) {
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNÇÃO DE CRIAR TAREFA ---
  const createTask = async (
    taskData: Omit<Task, "id" | "completed" | "createdAt" | "updatedAt">
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error("Falha ao criar a tarefa.");

      const newTask = await response.json();
      setWedding((prev) =>
        prev ? { ...prev, tasks: [...prev.tasks, newTask] } : null
      );
      toast.success("Tarefa criada com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao criar tarefa", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNÇÃO DE ATUALIZAR TAREFA ---
  const updateTask = async (
    taskId: string,
    taskData: Partial<Omit<Task, "id">>
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error("Falha ao atualizar a tarefa.");

      const updatedTask = await response.json();
      setWedding((prev) =>
        prev
          ? {
              ...prev,
              tasks: prev.tasks.map((task) =>
                task.id === taskId ? updatedTask : task
              ),
            }
          : null
      );
      toast.success("Tarefa atualizada!");
    } catch (error: any) {
      toast.error("Erro ao atualizar tarefa", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNÇÃO DE DELETAR TAREFA ---
  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Falha ao deletar a tarefa.");

      setWedding((prev) =>
        prev
          ? { ...prev, tasks: prev.tasks.filter((task) => task.id !== taskId) }
          : null
      );
      toast.success("Tarefa deletada com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao deletar tarefa", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { createTask, updateTask, deleteTask, isLoading };
}
