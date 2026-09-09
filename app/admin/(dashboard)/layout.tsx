"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Loading from "@/components/common/Loading";
import { isAdminRole } from "@/lib/roles";
import { useAuthStore } from "@/store/auth-store";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const user = useAuthStore((state) => state.user);
  const isAuthorized = isAdminRole(user?.role);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (!isAuthorized) {
      router.replace("/");
    }
  }, [hasHydrated, user, isAuthorized, router]);

  if (!hasHydrated || !user || !isAuthorized) {
    return <Loading label="Loading admin panel..." />;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
