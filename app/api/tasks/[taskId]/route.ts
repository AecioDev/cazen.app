// app/api/tasks/[taskId]/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// PATCH: Atualizar uma tarefa existente
export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const { taskId } = params;
    const body = await request.json();
    const { title, completed, dueDate, notes } = body;

    // Garante que o usuário só pode editar tarefas do seu próprio casamento
    const taskToUpdate = await prisma.task.findFirst({
      where: {
        id: taskId,
        wedding: {
          userId: session.user.id,
        },
      },
    });

    if (!taskToUpdate) {
      return new NextResponse("Tarefa não encontrada ou não autorizada", {
        status: 404,
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        completed,
        dueDate: dueDate ? new Date(dueDate) : null,
        notes,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("[TASK_PATCH]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}

// DELETE: Apagar uma tarefa existente
export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const { taskId } = params;

    // Garante que o usuário só pode deletar tarefas do seu próprio casamento
    const taskToDelete = await prisma.task.findFirst({
      where: {
        id: taskId,
        wedding: {
          userId: session.user.id,
        },
      },
    });

    if (!taskToDelete) {
      return new NextResponse("Tarefa não encontrada ou não autorizada", {
        status: 404,
      });
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return new NextResponse("Tarefa deletada com sucesso", { status: 200 });
  } catch (error) {
    console.error("[TASK_DELETE]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
