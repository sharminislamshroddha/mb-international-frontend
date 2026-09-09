"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { useAuthStore } from "@/store/auth-store";

export default function AdminHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div>
        <p className="text-sm font-medium">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs text-muted-foreground">
          {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
        </p>
      </div>

      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
      >
        View Store
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </header>
  );
}
