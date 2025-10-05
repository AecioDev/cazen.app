// components/tasks/tasks-view.tsx
"use client";

import { useWedding } from "@/components/providers/wedding-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/interfaces/wedding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Componente para um item individual da lista
function TaskItem({ task }: { task: Task }) {
  const { updateTask, isLoadingTasks } = useWedding();

  const handleCheckedChange = (checked: boolean) => {
    // Chama a função de atualização do nosso hook!
    updateTask(task.id, { completed: checked });
  };

  return (
    <div
      key={task.id}
      className="flex items-center gap-4 transition-opacity hover:opacity-80"
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={handleCheckedChange}
        disabled={isLoadingTasks}
      />
      <label
        htmlFor={`task-${task.id}`}
        className={`flex-1 cursor-pointer ${
          task.completed ? "text-muted-foreground line-through" : ""
        }`}
      >
        {task.title}
      </label>
    </div>
  );
}

export function TasksView() {
  const { tasks } = useWedding();

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tarefas Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingTasks.length > 0 ? (
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Ótimo trabalho! Nenhuma tarefa pendente por aqui.
            </p>
          )}
        </CardContent>
      </Card>

      {completedTasks.length > 0 && (
        <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Tarefas Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
