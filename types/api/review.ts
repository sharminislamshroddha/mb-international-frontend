export interface ApiReviewAuthor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ApiReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string | null;
  comment: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  user: ApiReviewAuthor;
}

export interface ApiAdminReview extends ApiReview {
  product: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ReviewQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  rating?: number;
  productId?: string;
  categoryId?: string;
  isPublished?: boolean;
  sortBy?: "createdAt" | "rating";
  sortOrder?: "asc" | "desc";
}

export interface CreateReviewPayload {
  rating: number;
  title?: string;
  comment?: string;
}

export type UpdateReviewPayload = Partial<CreateReviewPayload>;
