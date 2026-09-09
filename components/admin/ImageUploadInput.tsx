"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";

import { Input } from "@/components/ui/input";
import { useUploadImage } from "@/hooks/mutations/useUploadImage";

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploadInput({
  label,
  value,
  onChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadImage();

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    upload.mutate(file, {
      onSuccess: (url) => onChange(url),
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">{label}</label>

      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
          {value ? (
            <>
              <Image
                src={value}
                alt="Preview"
                fill
                sizes="64px"
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => onChange("")}
                aria-label="Remove image"
                className="absolute top-0.5 right-0.5 rounded-full bg-black/60 p-0.5 text-white hover:bg-black/80"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImagePlus className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={upload.isPending}
            className="flex h-9 w-fit items-center gap-1.5 rounded-lg border border-input px-3 text-sm font-medium hover:bg-muted disabled:opacity-60"
          >
            {upload.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImagePlus className="h-3.5 w-3.5" />
            )}
            {upload.isPending ? "Uploading..." : "Upload Image"}
          </button>

          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="or paste an image URL"
            className="text-xs"
          />
        </div>
      </div>

      {upload.isError && (
        <p className="text-sm text-destructive">
          {upload.error?.message ?? "Failed to upload image."}
        </p>
      )}
    </div>
  );
}
