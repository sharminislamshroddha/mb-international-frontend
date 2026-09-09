"use client";

import {
  notFound,
  useRouter,
  useSearchParams,
} from "next/navigation";

import Breadcrumb from "@/components/common/Breadcrumb";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import Container from "@/components/layout/Container";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductSkeletonGrid } from "@/components/product/ProductSkeleton";
import { useCategoryBySlug } from "@/hooks/queries/useCategoryBySlug";
import { useProducts } from "@/hooks/queries/useProducts";

const PAGE_SIZE = 12;

interface Props {
  slug: string;
}

export default function CategoryDetail({ slug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  const {
    data: category,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategoryBySlug(slug);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch,
  } = useProducts(
    {
      categoryId: category?.id,
      page,
      limit: PAGE_SIZE,
      isActive: true,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    { enabled: !!category?.id }
  );

  if (isCategoryLoading) {
    return <Loading label="Loading category..." />;
  }

  if (isCategoryError) {
    return (
      <ErrorMessage message="Failed to load this category." />
    );
  }

  if (!category) {
    notFound();
  }

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/categories/${slug}?${params.toString()}`);
  }

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <h1 className="mb-2 font-heading text-2xl font-bold lg:text-3xl">
        {category.name}
      </h1>

      {isProductsLoading && <ProductSkeletonGrid count={PAGE_SIZE} />}

      {isProductsError && (
        <ErrorMessage
          message="Failed to load products in this category."
          onRetry={() => refetch()}
        />
      )}

      {products && products.items.length === 0 && (
        <EmptyState
          title="No products in this category yet"
          description="Check back soon or browse the full shop."
        />
      )}

      {products && products.items.length > 0 && (
        <>
          <ProductGrid products={products.items} />

          <Pagination
            page={products.meta.page}
            totalPages={products.meta.totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </Container>
  );
}
