// app/api/tasks/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET: Buscar todas as tarefas do usuário logado
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const wedding = await prisma.wedding.findUnique({
      where: { userId: session.user.id },
      include: {
        tasks: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!wedding) {
      // Se não houver casamento, retorna uma lista vazia, o que é normal
      return NextResponse.json([]);
    }

    return NextResponse.json(wedding.tasks);
  } catch (error) {
    console.error("[TASKS_GET]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}

// POST: Criar uma nova tarefa
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, dueDate, notes } = body;

    if (!title) {
      return new NextResponse("O título da tarefa é obrigatório", {
        status: 400,
      });
    }

    // Primeiro, precisamos encontrar o 'weddingId' do usuário logado
    const wedding = await prisma.wedding.findUnique({
      where: { userId: session.user.id },
    });

    if (!wedding) {
      // Futuramente, podemos criar um casamento aqui se não existir
      return new NextResponse("Casamento não encontrado", { status: 404 });
    }

    const newTask = await prisma.task.create({
      data: {
        weddingId: wedding.id,
        title,
        dueDate: dueDate ? new Date(dueDate) : null,
        notes,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("[TASKS_POST]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
