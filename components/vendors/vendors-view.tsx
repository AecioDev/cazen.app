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
} from "@/components/ui/dialog";
import { Vendor } from "@/interfaces/wedding";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { StarRating } from "../ui/star-rating";
import { VendorForm } from "./vendor-form";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface VendorCardProps {
  vendor: Vendor;
  onEdit: () => void;
}

function VendorCard({ vendor, onEdit }: VendorCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <Card className="transition-shadow hover:shadow-md py-4">
      <CardHeader className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle>{vendor.name}</CardTitle>
          </div>
          <Icon
            icon="mdi:chevron-down"
            className={cn(
              "ml-4 h-6 w-6 transition-transform text-muted-foreground",
              {
                "rotate-180": isOpen,
              }
            )}
          />
        </div>
        <div className="flex justify-between items-end pt-1">
          <div>
            <CardDescription>{vendor.category}</CardDescription>
            <StarRating rating={vendor.rating || 0} readOnly className="mt-1" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEditClick}
            className="-mr-2"
          >
            <Icon icon="mdi:pencil" className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <Separator className="mb-4" />
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 items-start">
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:cash" className="h-5 w-5" />
                <span>{formatCurrency(vendor.cost)}</span>
              </div>
              {vendor.contactName && (
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:account-outline" className="h-5 w-5" />
                  <span>{vendor.contactName}</span>
                </div>
              )}
              {vendor.phone && (
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:phone-outline" className="h-5 w-5" />
                  <span>{vendor.phone}</span>
                </div>
              )}
            </div>
            <div className="flex h-full">
              <Separator orientation="vertical" className="mx-4" />
              <p className="text-sm text-muted-foreground break-words flex-1">
                {vendor.notes || "Nenhuma anotação."}
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function VendorsView() {
  const { vendors } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  const handleOpenModalForEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setIsModalOpen(true);
  };

  const handleOpenModalForNew = () => {
    setEditingVendor(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setEditingVendor(null);
    }, 150);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Button className="w-full" onClick={handleOpenModalForNew}>
          <Icon icon="mdi:plus" className="mr-2 h-5 w-5" />
          Adicionar Fornecedor
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingVendor
                ? "Editar Fornecedor"
                : "Adicionar Novo Fornecedor"}
            </DialogTitle>
          </DialogHeader>
          <VendorForm
            initialData={editingVendor}
            onFinished={handleCloseModal}
          />
        </DialogContent>
      </Dialog>

      {vendors.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onEdit={() => handleOpenModalForEdit(vendor)}
            />
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
