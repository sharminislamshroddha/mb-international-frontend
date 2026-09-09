"use client";

import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import { useCategories } from "@/hooks/queries/useCategories";

import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useCategories();

  if (isLoading) {
    return <Loading label="Loading categories..." />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Failed to load categories."
        onRetry={() => refetch()}
      />
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <EmptyState
        title="No categories yet"
        description="Check back soon."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}
