// app/vendors/page.tsx

import { PageViewLayout } from "@/components/layout/page-view-layout";
import { VendorsView } from "@/components/vendors/vendors-view";

export default function VendorsPage() {
  return (
    <PageViewLayout
      title="Fornecedores"
      subtitle="Organize todos os seus contatos em um só lugar"
    >
      <VendorsView />
    </PageViewLayout>
  );
}
