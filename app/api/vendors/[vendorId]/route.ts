// app/api/vendors/[vendorId]/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// PATCH: Atualizar um fornecedor existente
export async function PATCH(
  request: Request,
  { params }: { params: { vendorId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const { vendorId } = params;
    const body = await request.json();
    const {
      name,
      category,
      rating,
      contactName,
      phone,
      email,
      cost,
      paid,
      notes,
    } = body;

    // Medida de segurança: Confirma que o fornecedor a ser atualizado
    // pertence de fato ao casamento do usuário logado.
    const vendorToUpdate = await prisma.vendor.findFirst({
      where: {
        id: vendorId,
        wedding: {
          userId: session.user.id,
        },
      },
    });

    if (!vendorToUpdate) {
      return new NextResponse("Fornecedor não encontrado ou não autorizado", {
        status: 404,
      });
    }

    const updatedVendor = await prisma.vendor.update({
      where: {
        id: vendorId,
      },
      data: {
        name,
        category,
        rating,
        contactName,
        phone,
        email,
        cost,
        paid,
        notes,
      },
    });

    return NextResponse.json(updatedVendor);
  } catch (error) {
    console.error("[VENDOR_PATCH]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}

// DELETE: Apagar um fornecedor existente
export async function DELETE(
  request: Request,
  { params }: { params: { vendorId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  try {
    const { vendorId } = params;

    // Mesma checagem de segurança para o delete
    const vendorToDelete = await prisma.vendor.findFirst({
      where: {
        id: vendorId,
        wedding: {
          userId: session.user.id,
        },
      },
    });

    if (!vendorToDelete) {
      return new NextResponse("Fornecedor não encontrado ou não autorizado", {
        status: 404,
      });
    }

    await prisma.vendor.delete({
      where: {
        id: vendorId,
      },
    });

    return new NextResponse("Fornecedor deletado com sucesso", { status: 200 });
  } catch (error) {
    console.error("[VENDOR_DELETE]", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
