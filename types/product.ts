export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;

  shortDescription?: string;

  image: string;

  brand: string;

  category: string;

  price: number;

  salePrice?: number;

  currency: "BDT";

  stock: number;

  rating: number;

  reviewCount: number;

  isFeatured: boolean;

  isNew: boolean;

  isOnSale: boolean;
}