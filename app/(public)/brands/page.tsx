"use client";

import Image from "next/image";
import Link from "next/link";

import Breadcrumb from "@/components/common/Breadcrumb";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import Container from "@/components/layout/Container";
import { useBrands } from "@/hooks/queries/useBrands";

export default function BrandsPage() {
  const { data: brands, isLoading, isError, refetch } = useBrands();

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />

      <h1 className="mb-8 font-heading text-2xl font-bold lg:text-3xl">
        Shop by Brand
      </h1>

      {isLoading && <Loading label="Loading brands..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load brands."
          onRetry={() => refetch()}
        />
      )}

      {brands && brands.length === 0 && (
        <EmptyState title="No brands yet" />
      )}

      {brands && brands.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop?brand=${brand.id}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-16 w-16">
                {brand.logoUrl ? (
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    fill
                    sizes="64px"
                    unoptimized
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                    {brand.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <span className="text-sm font-medium">{brand.name}</span>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
