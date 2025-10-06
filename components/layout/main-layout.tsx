// components/layout/main-layout.tsx
import { BottomNavBar } from "./bottom-nav-bar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1 pb-24">{children}</main>
      {/* <BottomNavBar /> */}
    </>
  );
}
