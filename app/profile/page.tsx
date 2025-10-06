// app/profile/page.tsx

import { PageViewLayout } from "@/components/layout/page-view-layout";
import { ProfileView } from "@/components/profile/profile-view";

export default function ProfilePage() {
  return (
    <PageViewLayout
      title="Meu Perfil"
      subtitle="Gerencie suas informações e preferências"
    >
      <ProfileView />
    </PageViewLayout>
  );
}
