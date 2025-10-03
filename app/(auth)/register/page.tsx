// app/(auth)/register/page.tsx
import { RegisterForm } from "@/components/auth/forms/register-form";
import { PageViewLayout } from "@/components/layout/page-view-layout";

export default function RegisterPage() {
  return (
    <PageViewLayout title="Criar Conta">
      <RegisterForm />
    </PageViewLayout>
  );
}
