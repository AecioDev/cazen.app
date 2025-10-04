// app/welcome/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WelcomePage() {
  const router = useRouter();

  const handleContinue = () => {
    // Marca no localStorage que o usuário já viu a tela de boas-vindas
    localStorage.setItem("cazen_has_seen_welcome", "true");
    // Redireciona para o LOGIN
    router.push("/login");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background p-8 text-center">
      <Image
        src="/logo-cazen-sf.png"
        alt="Logo CaZen"
        width={150}
        height={150}
        className="mb-8"
      />
      <h1 className="text-3xl font-bold text-primary mb-4">
        Seja bem-vindo(a) ao CaZen!
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Estamos felizes em ter você aqui. Prepare-se para planejar o casamento
        dos seus sonhos com calma e tranquilidade.
      </p>
      <Button onClick={handleContinue} className="w-full max-w-xs">
        Vamos Começar
      </Button>
    </div>
  );
}
