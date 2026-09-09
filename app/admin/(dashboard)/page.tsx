"use client";

import {
  FolderTree,
  MessageSquareText,
  Package,
  PackageX,
  Shield,
  Tags,
  Users,
} from "lucide-react";

import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import { useDashboardStats } from "@/hooks/queries/useDashboardStats";

const CARD_CONFIG = [
  { key: "totalProducts", label: "Total Products", icon: Package },
  {
    key: "outOfStockProducts",
    label: "Out of Stock",
    icon: PackageX,
  },
  {
    key: "totalCategories",
    label: "Categories",
    icon: FolderTree,
  },
  { key: "totalBrands", label: "Brands", icon: Tags },
  {
    key: "totalReviews",
    label: "Reviews",
    icon: MessageSquareText,
  },
  { key: "totalCustomers", label: "Customers", icon: Users },
  { key: "totalAdmins", label: "Admins", icon: Shield },
] as const;

export default function AdminDashboardPage() {
  const { data: stats, isLoading, isError, refetch } =
    useDashboardStats();

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-bold">
        Dashboard
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        A quick overview of your store.
      </p>

      {isLoading && <Loading label="Loading stats..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load dashboard stats."
          onRetry={() => refetch()}
        />
      )}

      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CARD_CONFIG.map((card) => (
            <div
              key={card.key}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <card.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {stats[card.key]}
                </p>
                <p className="text-sm text-muted-foreground">
                  {card.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
