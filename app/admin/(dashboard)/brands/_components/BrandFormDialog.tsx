"use client";

import { FormEvent, useState } from "react";

import ImageUploadInput from "@/components/admin/ImageUploadInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useCreateBrand,
  useUpdateBrand,
} from "@/hooks/mutations/useBrandAdmin";
import { ApiBrand } from "@/types/api/product";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand?: ApiBrand | null;
}

export default function BrandFormDialog({
  open,
  onOpenChange,
  brand,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {brand ? "Edit Brand" : "New Brand"}
          </DialogTitle>
        </DialogHeader>

        <BrandForm
          key={brand?.id ?? "new"}
          brand={brand}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function BrandForm({
  brand,
  onDone,
}: {
  brand?: ApiBrand | null;
  onDone: () => void;
}) {
  const isEdit = !!brand;
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const mutation = isEdit ? updateBrand : createBrand;

  const [name, setName] = useState(brand?.name ?? "");
  const [description, setDescription] = useState(
    brand?.description ?? ""
  );
  const [logoUrl, setLogoUrl] = useState(brand?.logoUrl ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(
    brand?.websiteUrl ?? ""
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const payload = {
      name,
      description: description || undefined,
      logoUrl: logoUrl || undefined,
      websiteUrl: websiteUrl || undefined,
    };

    if (isEdit && brand) {
      updateBrand.mutate(
        { id: brand.id, payload },
        { onSuccess: onDone }
      );
      return;
    }

    createBrand.mutate(payload, { onSuccess: onDone });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input
          id="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <ImageUploadInput
        label="Logo"
        value={logoUrl}
        onChange={setLogoUrl}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="websiteUrl" className="text-sm font-medium">
          Website URL
        </label>
        <Input
          id="websiteUrl"
          value={websiteUrl}
          onChange={(event) => setWebsiteUrl(event.target.value)}
          placeholder="https://..."
        />
      </div>

      {mutation.isError && (
        <p className="text-sm text-destructive">
          {mutation.error?.message ?? "Something went wrong."}
        </p>
      )}

      <DialogFooter>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? "Saving..."
            : isEdit
              ? "Save Changes"
              : "Create Brand"}
        </Button>
      </DialogFooter>
    </form>
  );
}
