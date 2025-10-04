// components/dashboard/task-list-widget.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/interfaces/wedding";

interface TaskListWidgetProps {
  tasks: Task[];
}

export function TaskListWidget({ tasks }: TaskListWidgetProps) {
  const pendingTasks = tasks.filter((task) => !task.completed).slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        {pendingTasks.length > 0 ? (
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4">
                <Checkbox id={`task-${task.id}`} checked={task.completed} />
                <label htmlFor={`task-${task.id}`} className="flex-1">
                  {task.title}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhuma tarefa pendente por enquanto!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
