import { UserRole } from "@/types/api/auth";

export function isAdminRole(role?: UserRole | null) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export function isSuperAdminRole(role?: UserRole | null) {
  return role === "SUPER_ADMIN";
}
