// app/api/auth/register/route.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Validação básica dos dados
    if (!name || !email || !password) {
      return new NextResponse("Dados incompletos", { status: 400 });
    }

    // 2. Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("Usuário já cadastrado", { status: 409 }); // 409 Conflict
    }

    // 3. Criptografar a senha (nunca salve a senha em texto puro!)
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Criar o novo usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Retornar o usuário criado com sucesso (sem a senha)
    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      { status: 201 }
    ); // 201 Created
  } catch (error) {
    console.error("ERRO NO REGISTRO:", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
