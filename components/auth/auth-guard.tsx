// components/auth/auth-guard.tsx
"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppLoader } from "@/components/layout/app-loader";

const publicRoutes = ["/login", "/register", "/welcome"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Lógica de Onboarding (primeira visita)
  if (isMounted && typeof window !== "undefined") {
    const hasSeenWelcome = localStorage.getItem("cazen_has_seen_welcome");
    if (!hasSeenWelcome && pathname !== "/welcome") {
      router.replace("/welcome");
      return <AppLoader message="Estamos preparando tudo para você..." />;
    }
  }

  // 2. Enquanto a sessão carrega, exibe o loader
  if (status === "loading" || !isMounted) {
    return <AppLoader message="Verificando sua sessão..." />;
  }

  const isPublicRoute = publicRoutes.includes(pathname);

  // 3. Se o usuário NÃO está autenticado...
  if (status === "unauthenticated") {
    // ...e tenta acessar uma rota que NÃO é pública...
    if (!isPublicRoute) {
      router.replace("/login"); // ...força o redirecionamento para o login.
      return <AppLoader message="Você precisa estar logado para acessar..." />;
    }
  }

  // 4. Se o usuário ESTÁ autenticado...
  if (status === "authenticated") {
    // ...e tenta acessar uma rota PÚBLICA (ou a raiz)...
    if (isPublicRoute || pathname === "/") {
      router.replace("/dashboard"); // ...joga ele para o dashboard.
      return <AppLoader message="Redirecionando para o seu painel..." />;
    }
  }

  // 5. Se passou por todas as verificações, a rota é permitida e o conteúdo é renderizado.
  return children;
}
