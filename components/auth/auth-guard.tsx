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
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || status === "loading") return;

    const hasSeenWelcome = localStorage.getItem("cazen_has_seen_welcome");

    if (!hasSeenWelcome) {
      setIsOnboarding(true);

      const timer = setTimeout(() => {
        router.replace("/welcome");
      }, 2000);

      return () => clearTimeout(timer);
    }

    const isPublicRoute = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (status === "authenticated") {
      if (isPublicRoute || pathname === "/") {
        router.replace("/dashboard");
        return;
      }
    }

    if (status === "unauthenticated" && !isPublicRoute) {
      router.replace("/login");
      return;
    }

    setIsVerifying(false);
  }, [isMounted, status, pathname, router]);

  useEffect(() => {
    if (pathname === "/welcome") {
      setIsOnboarding(false);
      setIsVerifying(false);
    }
  }, [pathname]);

  if (isOnboarding || isVerifying || status === "loading") {
    return (
      <AppLoader
        message={
          isOnboarding
            ? "Aguarde, estamos preparando tudo para você..."
            : "Verificando sua sessão..."
        }
      />
    );
  }

  return children;
}
