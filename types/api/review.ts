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
  createdAt: string;
  updatedAt: string;
  user: ApiReviewAuthor;
}

export interface CreateReviewPayload {
  rating: number;
  title?: string;
  comment?: string;
}

export type UpdateReviewPayload = Partial<CreateReviewPayload>;
