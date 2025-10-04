// components/layout/app-loader.tsx
"use client";

import Image from "next/image";

interface AppLoaderProps {
  message?: string;
}

export function AppLoader({
  message = "Aguarde, estamos preparando tudo pra você...",
}: AppLoaderProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="animate-pulse flex flex-col items-center justify-center gap-4">
        <Image
          src="/logo-cazen-sf.png"
          alt="Logo CaZen"
          width={200}
          height={200}
          priority
        />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
