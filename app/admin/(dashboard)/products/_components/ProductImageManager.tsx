"use client";

import { ImagePlus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAddProductImage,
  useDeleteProductImage,
  useUpdateProductImage,
} from "@/hooks/mutations/useProductImageAdmin";
import { cn } from "@/lib/utils";
import { ApiProductImage } from "@/types/api/product";

interface Props {
  productId: string;
  images: ApiProductImage[];
}

export default function ProductImageManager({
  productId,
  images,
}: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const addImage = useAddProductImage(productId);
  const updateImage = useUpdateProductImage(productId);
  const deleteImage = useDeleteProductImage(productId);

  function handleAdd(event: FormEvent) {
    event.preventDefault();

    if (!imageUrl.trim()) return;

    addImage.mutate(
      {
        imageUrl: imageUrl.trim(),
        isPrimary: images.length === 0,
        sortOrder: images.length,
      },
      { onSuccess: () => setImageUrl("") }
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">
        Images
      </h2>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
            >
              <Image
                src={image.imageUrl}
                alt={image.altText ?? "Product image"}
                fill
                sizes="120px"
                unoptimized
                className="object-cover"
              />

              {image.isPrimary && (
                <span className="absolute top-1.5 left-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  Primary
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-black/50 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                {!image.isPrimary && (
                  <button
                    type="button"
                    title="Set as primary"
                    onClick={() =>
                      updateImage.mutate({
                        imageId: image.id,
                        payload: { isPrimary: true },
                      })
                    }
                    className="rounded p-1 text-white hover:bg-white/20"
                  >
                    <Star className="h-3.5 w-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  title="Delete image"
                  onClick={() => deleteImage.mutate(image.id)}
                  className={cn(
                    "rounded p-1 text-white hover:bg-white/20"
                  )}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleAdd} className="flex items-end gap-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="imageUrl" className="text-sm font-medium">
            Add image by URL
          </label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://..."
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          disabled={addImage.isPending}
          className="gap-1.5"
        >
          <ImagePlus className="h-4 w-4" />
          Add
        </Button>
      </form>

      {addImage.isError && (
        <p className="text-sm text-destructive">
          {addImage.error?.message ?? "Failed to add image."}
        </p>
      )}
    </div>
  );
}
