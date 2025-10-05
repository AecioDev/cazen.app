// app/api/tasks/apply-template/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";
import { taskTemplates } from "@/lib/data/task-templates";
import { subMonths } from "date-fns";

const prisma = new PrismaClient();

// POST: Criar tarefas a partir de um template
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const body = await request.json();
    const { templateId } = body;

    // Valida se o ID do template enviado existe no nosso arquivo
    if (!templateId || !(templateId in taskTemplates)) {
      return new NextResponse("Template inválido", { status: 400 });
    }

    // Busca o casamento do usuário para obter o ID e a data
    const wedding = await prisma.wedding.findUnique({
      where: { userId: session.user.id },
    });

    if (!wedding) {
      return new NextResponse("Casamento não encontrado", { status: 404 });
    }

    // Pega o template escolhido
    const template = taskTemplates[templateId as keyof typeof taskTemplates];

    // Prepara os dados de todas as tarefas para inserção em massa
    const tasksToCreate = template.tasks.map((task) => {
      // Calcula a 'dueDate' baseada na data do casamento
      const dueDate = task.monthsBefore
        ? subMonths(wedding.date, task.monthsBefore)
        : null;

      return {
        weddingId: wedding.id,
        title: task.title,
        notes: task.notes || null,
        dueDate,
        completed: false, // Todas começam como não completas
      };
    });

    // Usa 'createMany' para inserir todas as tarefas de uma vez (muito mais eficiente)
    await prisma.task.createMany({
      data: tasksToCreate,
    });

    // Após criar, busca todas as tarefas (incluindo as novas) para retornar ao frontend
    const allTasks = await prisma.task.findMany({
      where: { weddingId: wedding.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(allTasks, { status: 201 });
  } catch (error) {
    console.error("[APPLY_TEMPLATE_POST]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
