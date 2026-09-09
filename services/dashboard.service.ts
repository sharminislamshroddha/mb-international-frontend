import { apiClient } from "@/lib/api/client";
import { ApiSuccessResponse } from "@/types/api/common";
import { DashboardStats } from "@/types/api/dashboard";

export async function getDashboardStats() {
  const { data } = await apiClient.get<
    ApiSuccessResponse<DashboardStats>
  >("/dashboard/stats");

  return data.data;
}
