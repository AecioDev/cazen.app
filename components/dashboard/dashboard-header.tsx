// components/dashboard/dashboard-header.tsx
"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Icon } from "@iconify/react";

export function DashboardHeader() {
  const { data: session } = useSession();

  const firstName = session?.user?.name?.split(" ")[0] || "";

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        {/* Ajuste 3: Corrigindo as cores da fonte */}
        <h1 className="text-2xl font-bold text-primary-foreground">
          Olá, {firstName}!
        </h1>
        <p className="text-sm text-primary-foreground/80">
          Cada dia mais perto do grande dia!
        </p>
      </div>
      <Link href="/profile">
        <Avatar className="h-12 w-12">
          <AvatarFallback>
            <Icon icon="mdi:heart-outline" className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
