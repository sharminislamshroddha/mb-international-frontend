import { ApiProduct } from "@/types/api/product";
import { Product } from "@/types/product";

const NEW_PRODUCT_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

export function mapProduct(product: ApiProduct): Product {
  const primaryImage =
    product.images.find((image) => image.isPrimary) ??
    product.images[0];

  const price = Number(product.price);
  const salePrice = product.salePrice
    ? Number(product.salePrice)
    : undefined;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    shortDescription: product.shortDescription ?? undefined,
    description: product.description ?? undefined,
    image: primaryImage?.imageUrl ?? "",
    images: product.images.map((image) => image.imageUrl),
    brand: product.brand?.name ?? "",
    category: product.category.name,
    categorySlug: product.category.slug,
    price,
    salePrice,
    currency: "BDT",
    stock: product.stockQuantity,
    rating: product.averageRating,
    reviewCount: product.reviewCount,
    isFeatured: product.isFeatured,
    isNew:
      Date.now() - new Date(product.createdAt).getTime() <
      NEW_PRODUCT_WINDOW_MS,
    isOnSale: salePrice !== undefined && salePrice < price,
  };
}
