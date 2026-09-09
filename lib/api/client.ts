import axios from "axios";

import { env } from "@/config/env";
import { useAuthStore } from "@/store/auth-store";
import { ApiErrorResponse } from "@/types/api/common";

import { ApiError } from "./error";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as
        | ApiErrorResponse
        | undefined;

      if (error.response?.status === 401) {
        useAuthStore.getState().clearAuth();
      }

      return Promise.reject(
        new ApiError(
          error.response?.status ?? 0,
          data?.message ?? "Something went wrong. Please try again.",
          data?.errors
        )
      );
    }

    return Promise.reject(error);
  }
);
