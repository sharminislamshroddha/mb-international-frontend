"use client";

import Link from "next/link";

import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import PageSection from "@/components/common/PageSection";
import SectionHeading from "@/components/common/SectionHeading";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductSkeletonGrid } from "@/components/product/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/queries/useProducts";

export default function FeaturedProducts() {
  const { data, isLoading, isError, refetch } = useProducts({
    isFeatured: true,
    isActive: true,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <PageSection className="bg-muted/30">
      <SectionHeading
        subtitle="Handpicked"
        title="Featured Products"
      />

      {isLoading && <ProductSkeletonGrid count={10} />}

      {isError && (
        <ErrorMessage
          message="Failed to load featured products."
          onRetry={() => refetch()}
        />
      )}

      {data && data.items.length === 0 && (
        <EmptyState title="No featured products yet" />
      )}

      {data && data.items.length > 0 && (
        <>
          <ProductGrid products={data.items} />

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/shop" />}
              nativeButton={false}
            >
              View All Products
            </Button>
          </div>
        </>
      )}
    </PageSection>
  );
}
