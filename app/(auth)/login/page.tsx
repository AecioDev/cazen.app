// app/(auth)/login/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageViewLayout } from "@/components/layout/page-view-layout";
import { LoginForm } from "@/components/auth/forms/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <PageViewLayout
      title="Fazer Login"
      subtitle="Organize o seu dia especial com calma e tranquilidade!"
      showBackButton={false}
    >
      <Card className="rounded-[2rem] shadow-lg border-none bg-muted text-muted-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Bem-vindo(a) de volta!</CardTitle>
          <CardDescription>Insira seus dados para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p>
            Ainda não tem uma conta?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </PageViewLayout>
  );
}

/*
  // app/(auth)/login/page.tsx

import { PageViewLayout } from "@/components/layout/page-view-layout";
import { LoginForm } from "@/components/auth/forms/login-form";

export default function LoginPage() {
  return (
    <PageViewLayout
      title="Fazer Login"
      subtitle="Organize o seu dia especial com calma e tranquilidade!"
    >
      <Card
        className={cn(
          "rounded-[2rem] shadow-md bg-muted text-muted-foreground border",
          resolvedTheme === "dark"
            ? "border-primary border-2"
            : "border-primary"
        )}
      >
        <CardContent className="p-4 space-y-4 font-medium">
          <LoginForm />
        </CardContent>
      </Card>
    </PageViewLayout>
  );
}

*/
