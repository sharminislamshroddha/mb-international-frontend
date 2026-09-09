import { ApiCategory } from "./category";

export type ApiProductStatus =
  | "DRAFT"
  | "ACTIVE"
  | "OUT_OF_STOCK"
  | "DISCONTINUED";

export interface ApiBrand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface ApiProduct {
  id: string;
  categoryId: string;
  brandId: string | null;
  sku: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  price: string;
  salePrice: string | null;
  stockQuantity: number;
  status: ApiProductStatus;
  isActive: boolean;
  isFeatured: boolean;
  averageRating: number;
  reviewCount: number;
  category: ApiCategory;
  brand: ApiBrand | null;
  images: ApiProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  status?: ApiProductStatus;
  isFeatured?: boolean;
  isActive?: boolean;
  sortBy?: "name" | "price" | "createdAt" | "stockQuantity" | "averageRating";
  sortOrder?: "asc" | "desc";
}

export interface BrandPayload {
  name: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  isActive?: boolean;
}

export interface ProductPayload {
  categoryId: string;
  brandId?: string;
  sku: string;
  name: string;
  shortDescription?: string;
  description?: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  status?: ApiProductStatus;
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface ProductImagePayload {
  imageUrl: string;
  altText?: string;
  isPrimary?: boolean;
  sortOrder?: number;
}
