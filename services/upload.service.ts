import { apiClient } from "@/lib/api/client";
import { ApiSuccessResponse } from "@/types/api/common";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<
    ApiSuccessResponse<{ url: string }>
  >("/uploads/image", formData, {
    headers: {
      // Let the browser set the multipart boundary itself —
      // the client's default JSON content-type would otherwise
      // override it and the backend can't parse the request.
      "Content-Type": undefined,
    },
  });

  return data.data.url;
}
