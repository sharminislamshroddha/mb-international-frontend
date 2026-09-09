import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createAdmin,
  updateUserRole,
  updateUserStatus,
} from "@/services/user.service";
import { CreateAdminPayload, UserRole } from "@/types/api/auth";

function useInvalidateUsers() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
  };
}

export function useCreateAdminUser() {
  const invalidate = useInvalidateUsers();

  return useMutation({
    mutationFn: (payload: CreateAdminPayload) =>
      createAdmin(payload),
    onSuccess: invalidate,
  });
}

export function useUpdateUserRole() {
  const invalidate = useInvalidateUsers();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      updateUserRole(id, role),
    onSuccess: invalidate,
  });
}

export function useUpdateUserStatus() {
  const invalidate = useInvalidateUsers();

  return useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: string;
      isActive: boolean;
    }) => updateUserStatus(id, isActive),
    onSuccess: invalidate,
  });
}
