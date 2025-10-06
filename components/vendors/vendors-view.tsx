// components/vendors/vendors-view.tsx
"use client";

import { useWedding } from "@/components/providers/wedding-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Vendor } from "@/interfaces/wedding";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { VendorForm } from "./vendor-form";

function VendorCard({ vendor }: { vendor: Vendor }) {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{vendor.name}</span>
        </CardTitle>
        <CardDescription>{vendor.category}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:cash" />
          <span>{formatCurrency(vendor.cost)}</span>
        </div>
        {vendor.contactName && (
          <div className="flex items-center gap-2">
            <Icon icon="mdi:account-outline" />
            <span>{vendor.contactName}</span>
          </div>
        )}
        {vendor.phone && (
          <div className="flex items-center gap-2">
            <Icon icon="mdi:phone-outline" />
            <span>{vendor.phone}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function VendorsView() {
  const { vendors } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Icon icon="mdi:plus" className="mr-2 h-5 w-5" />
            Adicionar Fornecedor
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Fornecedor</DialogTitle>
          </DialogHeader>
          <VendorForm onFinished={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {vendors.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg mt-6">
          <Icon
            icon="mdi:store-outline"
            className="mx-auto h-16 w-16 text-muted-foreground/50"
          />
          <h3 className="mt-4 text-lg font-semibold">
            Nenhum fornecedor cadastrado
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Comece a organizar seus contatos clicando no botão acima.
          </p>
        </div>
      )}
    </div>
  );
}
