// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  // Por enquanto, a página inicial apenas redireciona para o login.
  // No futuro, aqui entrará nosso AuthGuard para redirecionar para o dashboard se o usuário já estiver logado.
  redirect("/login");

  // Você pode retornar um loader simples aqui, embora o redirect seja quase instantâneo.
  return null;
}
