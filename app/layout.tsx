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
import { WeddingProvider } from "@/components/providers/wedding-provider";

export const metadata: Metadata = {
  title: "CaZen",
  description: "Planeje seu casamento com calma",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#92ac8c" />
      </head>
      <body className={`font-sans bg-muted/40`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col bg-background">
              <AuthGuard>
                <WeddingProvider>
                  <MainLayout>{children}</MainLayout>
                </WeddingProvider>
              </AuthGuard>
            </div>
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
