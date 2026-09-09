export type UserRole = "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";

export type AuthProvider = "LOCAL" | "GOOGLE" | "FACEBOOK";

export interface ApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: UserRole;
  provider: AuthProvider;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  user: ApiUser;
  token: string;
}

export interface AdminUserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole | UserRole[];
  isActive?: boolean;
  sortBy?: "firstName" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface CreateAdminPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "ADMIN" | "SUPER_ADMIN";
}
