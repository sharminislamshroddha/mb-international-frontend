"use client";

import { useBrands } from "@/hooks/queries/useBrands";
import { useCategories } from "@/hooks/queries/useCategories";
import { cn } from "@/lib/utils";

interface Props {
  selectedCategory?: string;
  selectedBrand?: string;
  onCategoryChange: (id?: string) => void;
  onBrandChange: (id?: string) => void;
}

export default function ShopFilters({
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: Props) {
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  return (
    <aside className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 font-heading text-sm font-semibold">
          Category
        </h3>

        <div className="flex flex-col gap-1">
          <FilterOption
            label="All Categories"
            active={!selectedCategory}
            onClick={() => onCategoryChange(undefined)}
          />

          {categories?.map((category) => (
            <FilterOption
              key={category.id}
              label={category.name}
              active={selectedCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-heading text-sm font-semibold">
          Brand
        </h3>

        <div className="flex flex-col gap-1">
          <FilterOption
            label="All Brands"
            active={!selectedBrand}
            onClick={() => onBrandChange(undefined)}
          />

          {brands?.map((brand) => (
            <FilterOption
              key={brand.id}
              label={brand.name}
              active={selectedBrand === brand.id}
              onClick={() => onBrandChange(brand.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function FilterOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-muted",
        active
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground"
      )}
    >
      {label}
    </button>
  );
}
