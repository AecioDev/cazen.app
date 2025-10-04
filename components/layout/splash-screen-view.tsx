// components/layout/splash-screen-view.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLoader } from "./app-loader";

export function SplashScreenView() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return <AppLoader message="Aguarde, estamos preparando tudo pra você..." />;
}
