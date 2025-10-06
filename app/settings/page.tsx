// app/settings/page.tsx

import { PageViewLayout } from "@/components/layout/page-view-layout";
import { SettingsForm } from "@/components/settings/form/settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <PageViewLayout
      title="Configurações"
      subtitle="Defina os detalhes mais importantes do seu casamento"
    >
      <Card>
        <CardHeader>
          <CardTitle>Dados Principais</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
    </PageViewLayout>
  );
}
