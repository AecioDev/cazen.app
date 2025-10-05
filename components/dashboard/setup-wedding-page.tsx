// components/dashboard/setup-wedding-page.tsx
"use client";

import { useWedding } from "@/components/providers/wedding-provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Wedding } from "@/interfaces/wedding";
import { useRouter } from "next/navigation";
import Image from "next/image"; // 1. Importe o componente Image
import Link from "next/link";

export function SetupWeddingPage() {
  const { setWedding } = useWedding();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateInitialWedding = async () => {
    setIsLoading(true);
    try {
      const initialWeddingDate = new Date();
      initialWeddingDate.setFullYear(initialWeddingDate.getFullYear() + 1);

      const response = await fetch("/api/wedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: initialWeddingDate.toISOString(),
          budget: 10000,
        }),
      });

      if (!response.ok) throw new Error("Falha ao criar o casamento inicial.");

      const newWedding: Wedding = await response.json();
      // O tipo FullWedding precisa ser importado ou definido se for usar aqui
      setWedding(newWedding as any); // Usando 'as any' por enquanto para simplificar
      toast.success("Seu casamento foi configurado! Bem-vindo(a)!");
      router.replace("/dashboard");
    } catch (error: any) {
      console.error("[CREATE_INITIAL_WEDDING]", error);
      toast.error("Erro ao configurar o casamento", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 p-8 text-center">
      {/* 2. Substitua o AppLogo pela imagem */}
      <Image
        src="/logo-cazen-sf.png"
        alt="Logo CaZen"
        width={180}
        height={180}
        priority
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Bem-vindo(a) ao CaZen!
        </h1>
        <p className="text-muted-foreground max-w-sm">
          Parece que você ainda não começou a planejar seu casamento. Vamos
          começar a organizar o grande dia?
        </p>
      </div>
      <Button onClick={handleCreateInitialWedding} disabled={isLoading}>
        {isLoading ? "Configurando..." : "Configurar meu Casamento"}
      </Button>
      <Link
        href="/api/auth/signout"
        className="text-sm text-muted-foreground hover:underline"
      >
        Sair
      </Link>
    </div>
  );
}
