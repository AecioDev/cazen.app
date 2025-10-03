// app/layout.tsx

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/components/providers/auth-provider";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthGuard } from "@/components/auth/auth-guard";
import { MainLayout } from "@/components/layout/main-layout";

export const metadata: Metadata = {
  title: "CaZen",
  description: "Planeje seu casamento com calma",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans bg-muted/40`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative mx-auto flex min-h-screen w-full flex-col bg-background md:max-w-md">
              <AuthGuard>
                <MainLayout>{children}</MainLayout>
              </AuthGuard>
            </div>
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
