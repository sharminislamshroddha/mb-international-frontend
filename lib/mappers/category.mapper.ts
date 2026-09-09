import { ApiCategory } from "@/types/api/category";
import { Category } from "@/types/category";

export function mapCategory(category: ApiCategory): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.imageUrl,
  };
}
