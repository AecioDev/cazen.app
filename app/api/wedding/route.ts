// app/api/wedding/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET: Buscar todos os dados do casamento do usuário logado
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
        vendors: {
          orderBy: {
            category: "asc",
          },
        },
        // No futuro, incluiremos outras relações aqui (guests, etc.)
      },
    });

    // IMPORTANTE: Se o usuário acabou de se cadastrar, ele pode não ter um 'wedding' ainda.
    // Nesse caso, retornamos nulo para o frontend saber que precisa criar um.
    if (!wedding) {
      return NextResponse.json(null);
    }

    return NextResponse.json(wedding);
  } catch (error) {
    console.error("[WEDDING_GET]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}

// POST: Criar o primeiro registro de casamento para o usuário logado
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const body = await request.json();
    const { date, budget } = body;

    if (!date) {
      return new NextResponse("A data do casamento é obrigatória", {
        status: 400,
      });
    }

    // Verifica se o usuário já possui um casamento
    const existingWedding = await prisma.wedding.findUnique({
      where: { userId: session.user.id },
    });

    if (existingWedding) {
      return new NextResponse("O usuário já possui um casamento configurado.", {
        status: 409,
      }); // 409 Conflict
    }

    const newWedding = await prisma.wedding.create({
      data: {
        userId: session.user.id,
        date: new Date(date),
        budget: budget || 0, // Garante que o orçamento tenha um valor padrão
      },
      include: {
        tasks: true, // Inclui as tarefas (que estarão vazias inicialmente)
      },
    });

    return NextResponse.json(newWedding, { status: 201 });
  } catch (error) {
    console.error("[WEDDING_POST]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
