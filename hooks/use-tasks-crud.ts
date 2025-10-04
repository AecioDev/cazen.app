// hooks/use-tasks-crud.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Task } from "@/interfaces/wedding";

// As funções do hook receberão o 'setter' do estado principal do Provider
type TaskCrudProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export function useTasksCrud({ setTasks }: TaskCrudProps) {
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
      setTasks((prev) => [...prev, newTask]); // Adiciona a nova tarefa ao estado local
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
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
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

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.success("Tarefa deletada com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao deletar tarefa", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { createTask, updateTask, deleteTask, isLoading };
}
