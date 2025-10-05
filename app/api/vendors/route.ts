// app/api/vendors/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET: Buscar todos os fornecedores do usuário logado
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    // Busca o casamento do usuário para garantir o escopo correto
    const wedding = await prisma.wedding.findUnique({
      where: { userId: session.user.id },
      include: {
        vendors: {
          orderBy: {
            category: "asc", // Ordena por categoria para agrupar visualmente
          },
        },
      },
    });

    if (!wedding) {
      return NextResponse.json([]); // Se não há casamento, não há fornecedores
    }

    return NextResponse.json(wedding.vendors);
  } catch (error) {
    console.error("[VENDORS_GET]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}

// POST: Criar um novo fornecedor
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const body = await request.json();
    // Desestruturamos todos os campos que definimos no schema
    const { name, category, contactName, phone, email, cost, notes } = body;

    if (!name || !category) {
      return new NextResponse("Nome e categoria são obrigatórios", {
        status: 400,
      });
    }

    // Encontra o casamento do usuário para vincular o novo fornecedor
    const wedding = await prisma.wedding.findUnique({
      where: { userId: session.user.id },
    });

    if (!wedding) {
      return new NextResponse("Casamento não encontrado", { status: 404 });
    }

    const newVendor = await prisma.vendor.create({
      data: {
        weddingId: wedding.id,
        name,
        category,
        contactName,
        phone,
        email,
        cost,
        notes,
      },
    });

    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    console.error("[VENDORS_POST]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
