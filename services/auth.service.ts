import { apiClient } from "@/lib/api/client";
import { ApiUser, AuthPayload } from "@/types/api/auth";
import { ApiSuccessResponse } from "@/types/api/common";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
  phone?: string;
}

export async function login(payload: LoginPayload) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<AuthPayload>
  >("/auth/login", payload);

  return data.data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<AuthPayload>
  >("/auth/register", payload);

  return data.data;
}

export async function loginWithGoogle(idToken: string) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<AuthPayload>
  >("/auth/google", { idToken });

  return data.data;
}

export async function loginWithFacebook(accessToken: string) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<AuthPayload>
  >("/auth/facebook", { accessToken });

  return data.data;
}

export async function getMe() {
  const { data } =
    await apiClient.get<ApiSuccessResponse<ApiUser>>("/auth/me");

  return data.data;
}
