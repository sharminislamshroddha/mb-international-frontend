"use client";

import {
  FolderTree,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Package,
  ShieldCheck,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { isSuperAdminRole } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    superAdminOnly: false,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
    superAdminOnly: false,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
    superAdminOnly: false,
  },
  {
    label: "Brands",
    href: "/admin/brands",
    icon: Tags,
    superAdminOnly: false,
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquareText,
    superAdminOnly: false,
  },
  {
    label: "Admins",
    href: "/admin/admins",
    icon: ShieldCheck,
    superAdminOnly: true,
  },
  {
    label: "Customers",
    href: "/admin/users",
    icon: Users,
    superAdminOnly: true,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const items = NAV_ITEMS.filter(
    (item) => !item.superAdminOnly || isSuperAdminRole(user?.role)
  );

  function handleLogout() {
    clearAuth();
    router.push("/admin/login");
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="font-heading text-lg font-bold text-primary">
          Admin Panel
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {items.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
