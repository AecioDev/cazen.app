// app/(auth)/register/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageViewLayout } from "@/components/layout/page-view-layout";
import { RegisterForm } from "@/components/auth/forms/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <PageViewLayout
      title="Criar Conta"
      subtitle="Comece a planejar o dia dos seus sonhos!"
    >
      <Card className="rounded-[2rem] shadow-lg border-none bg-muted text-muted-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Vamos começar!</CardTitle>
          <CardDescription>É rápido e fácil, prometemos!</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p>
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </PageViewLayout>
  );
}
