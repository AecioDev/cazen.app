// components/dashboard/setup-wedding-page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { InitialSetupForm } from "./initial-setup-form";

export function SetupWeddingPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 p-8 text-center">
      <Image
        src="/logo-cazen-sf.png"
        alt="Logo CaZen"
        width={150}
        height={150}
        priority
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">Vamos começar!</h1>
        <p className="text-muted-foreground max-w-sm">
          Para iniciar, precisamos de alguns detalhes importantes.
        </p>
      </div>

      <InitialSetupForm />

      <Link
        href="/api/auth/signout"
        className="text-sm text-muted-foreground hover:underline pt-4"
      >
        Sair
      </Link>
    </div>
  );
}
