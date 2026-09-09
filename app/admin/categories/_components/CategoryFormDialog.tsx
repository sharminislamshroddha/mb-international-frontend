"use client";

import { FormEvent, useState } from "react";

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
  useCreateCategory,
  useUpdateCategory,
} from "@/hooks/mutations/useCategoryAdmin";
import { ApiCategory } from "@/types/api/category";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ApiCategory | null;
}

export default function CategoryFormDialog({
  open,
  onOpenChange,
  category,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "New Category"}
          </DialogTitle>
        </DialogHeader>

        <CategoryForm
          key={category?.id ?? "new"}
          category={category}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function CategoryForm({
  category,
  onDone,
}: {
  category?: ApiCategory | null;
  onDone: () => void;
}) {
  const isEdit = !!category;
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const mutation = isEdit ? updateCategory : createCategory;

  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(
    category?.description ?? ""
  );
  const [imageUrl, setImageUrl] = useState(
    category?.imageUrl ?? ""
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const payload = {
      name,
      description: description || undefined,
      imageUrl: imageUrl || undefined,
    };

    if (isEdit && category) {
      updateCategory.mutate(
        { id: category.id, payload },
        { onSuccess: onDone }
      );
      return;
    }

    createCategory.mutate(payload, { onSuccess: onDone });
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="imageUrl" className="text-sm font-medium">
          Image URL
        </label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
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
              : "Create Category"}
        </Button>
      </DialogFooter>
    </form>
  );
}
