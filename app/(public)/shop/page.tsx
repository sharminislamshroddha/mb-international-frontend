"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Breadcrumb from "@/components/common/Breadcrumb";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import Container from "@/components/layout/Container";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductSkeletonGrid } from "@/components/product/ProductSkeleton";
import { useProducts } from "@/hooks/queries/useProducts";

import ShopFilters from "./_components/ShopFilters";
import ShopSort, { SORT_OPTIONS, SortKey } from "./_components/ShopSort";

const PAGE_SIZE = 12;

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? undefined;
  const categoryId = searchParams.get("category") ?? undefined;
  const brandId = searchParams.get("brand") ?? undefined;
  const sortKey = (searchParams.get("sort") ?? "newest") as SortKey;
  const sortOption = SORT_OPTIONS[sortKey] ?? SORT_OPTIONS.newest;

  const { data, isLoading, isError, refetch } = useProducts({
    page,
    limit: PAGE_SIZE,
    search,
    categoryId,
    brandId,
    isActive: true,
    sortBy: sortOption.sortBy,
    sortOrder: sortOption.sortOrder,
  });

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    if (!("page" in updates)) {
      params.delete("page");
    }

    router.push(`/shop?${params.toString()}`);
  }

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <h1 className="mb-8 font-heading text-2xl font-bold lg:text-3xl">
        {search ? `Search results for "${search}"` : "Shop All Products"}
      </h1>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <ShopFilters
          selectedCategory={categoryId}
          selectedBrand={brandId}
          onCategoryChange={(id) => updateParams({ category: id })}
          onBrandChange={(id) => updateParams({ brand: id })}
        />

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {data ? `${data.meta.total} products found` : "Loading..."}
            </p>

            <ShopSort
              value={sortKey}
              onChange={(value) => updateParams({ sort: value })}
            />
          </div>

          {isLoading && <ProductSkeletonGrid count={PAGE_SIZE} />}

          {isError && (
            <ErrorMessage
              message="Failed to load products."
              onRetry={() => refetch()}
            />
          )}

          {data && data.items.length === 0 && (
            <EmptyState
              title="No products found"
              description="Try adjusting your filters or search term."
            />
          )}

          {data && data.items.length > 0 && (
            <>
              <ProductGrid products={data.items} />

              <Pagination
                page={data.meta.page}
                totalPages={data.meta.totalPages}
                onPageChange={(nextPage) =>
                  updateParams({ page: String(nextPage) })
                }
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
