// components/layout/main-layout.tsx
import { BottomNavBar } from "./bottom-nav-bar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col bg-background md:max-w-screen-md">
      <main className="flex-1 pb-24">{children}</main>
      <BottomNavBar />
    </div>
  );
}
