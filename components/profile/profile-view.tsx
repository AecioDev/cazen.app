// components/profile/profile-view.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function ProfileView() {
  const { data: session } = useSession();

  const user = session?.user;
  const userInitials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="space-y-6">
      <div className="relative -mt-20 flex flex-col items-center">
        <div className="rounded-full bg-background p-1.5 shadow-md">
          <Avatar className="h-24 w-24 text-3xl">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurações da Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/settings" passHref>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Icon icon="mdi:cog-outline" />
              Data e Orçamento do Casamento
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Icon icon="mdi:pencil-outline" />
            Editar Dados Pessoais
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Icon icon="mdi:lock-outline" />
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium mb-2">Tema</p>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Separator />

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <Icon icon="mdi:logout" className="mr-2 h-5 w-5" />
        Sair da Conta
      </Button>
    </div>
  );
}
