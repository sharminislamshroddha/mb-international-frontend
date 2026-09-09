"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { isSuperAdminRole } from "@/lib/roles";
import { useAuthStore } from "@/store/auth-store";

export function useRequireSuperAdmin() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthorized = !!user && isSuperAdminRole(user.role);

  useEffect(() => {
    if (user && !isAuthorized) {
      router.replace("/admin");
    }
  }, [user, isAuthorized, router]);

  return { user, isAuthorized };
}
