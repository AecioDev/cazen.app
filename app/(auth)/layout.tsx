// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Este layout simples apenas renderiza as páginas filhas,
  // sem o AuthGuard e o MainLayout do layout principal.
  return <>{children}</>;
}
