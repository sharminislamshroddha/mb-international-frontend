"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Breadcrumb from "@/components/common/Breadcrumb";
import Loading from "@/components/common/Loading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/queries/useMe";
import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { data: user, isLoading } = useMe();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated || isLoading) {
    return <Loading label="Loading your profile..." />;
  }

  function handleLogout() {
    clearAuth();
    router.push("/");
  }

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Profile" }]}
      />

      <h1 className="mb-8 font-heading text-2xl font-bold lg:text-3xl">
        My Account
      </h1>

      <div className="max-w-lg rounded-2xl border border-border p-6">
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Name</dt>
            <dd className="font-medium">
              {user?.firstName} {user?.lastName}
            </dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium">{user?.email}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="font-medium">
              {user?.phone ?? "Not provided"}
            </dd>
          </div>
        </dl>

        <Button
          variant="outline"
          className="mt-6"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Container>
  );
}
