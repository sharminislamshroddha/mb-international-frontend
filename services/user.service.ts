import { apiClient } from "@/lib/api/client";
import {
  AdminUserQueryParams,
  ApiUser,
  CreateAdminPayload,
  UserRole,
} from "@/types/api/auth";
import { ApiPaginatedResponse, ApiSuccessResponse } from "@/types/api/common";

export async function getUsers(params?: AdminUserQueryParams) {
  const { role, ...rest } = params ?? {};

  const { data } = await apiClient.get<
    ApiPaginatedResponse<ApiUser>
  >("/users", {
    params: {
      ...rest,
      role: Array.isArray(role) ? role.join(",") : role,
    },
  });

  return data;
}

export async function createAdmin(payload: CreateAdminPayload) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<ApiUser>
  >("/users", payload);

  return data.data;
}

export async function updateUserRole(id: string, role: UserRole) {
  const { data } = await apiClient.patch<
    ApiSuccessResponse<ApiUser>
  >(`/users/${id}/role`, { role });

  return data.data;
}

export async function updateUserStatus(
  id: string,
  isActive: boolean
) {
  const { data } = await apiClient.patch<
    ApiSuccessResponse<ApiUser>
  >(`/users/${id}/status`, { isActive });

  return data.data;
}
