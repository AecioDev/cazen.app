// app/(auth)/login/page.tsx

import { PageViewLayout } from "@/components/layout/page-view-layout";
import { LoginForm } from "@/components/auth/forms/login-form";

export default function LoginPage() {
  return (
    <PageViewLayout title="Fazer Login">
      <LoginForm />
      <p className="text-center p-8">Nosso formulário de login virá aqui!</p>
    </PageViewLayout>
  );
}
