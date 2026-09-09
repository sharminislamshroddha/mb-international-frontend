"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useUpdateUserRole,
  useUpdateUserStatus,
} from "@/hooks/mutations/useUserAdmin";
import { useAdminUsers } from "@/hooks/queries/useAdminUsers";
import { isSuperAdminRole } from "@/lib/roles";
import { useAuthStore } from "@/store/auth-store";
import { ApiUser, UserRole } from "@/types/api/auth";

import CreateAdminDialog from "./_components/CreateAdminDialog";

const PAGE_SIZE = 10;
const ROLE_OPTIONS: UserRole[] = ["CUSTOMER", "ADMIN", "SUPER_ADMIN"];

export default function AdminUsersPage() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (currentUser && !isSuperAdminRole(currentUser.role)) {
      router.replace("/admin");
    }
  }, [currentUser, router]);

  const { data, isLoading, isError, refetch } = useAdminUsers({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const updateRole = useUpdateUserRole();
  const updateStatus = useUpdateUserStatus();

  if (!currentUser || !isSuperAdminRole(currentUser.role)) {
    return <Loading label="Checking access..." />;
  }

  function isSelf(user: ApiUser) {
    return user.id === currentUser?.id;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Admins & Users
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage customer accounts and admin access.
          </p>
        </div>

        <Button
          onClick={() => setDialogOpen(true)}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          New Admin
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
      </div>

      {isLoading && <Loading label="Loading users..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load users."
          onRetry={() => refetch()}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState title="No users found" />
      )}

      {data && data.data.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Sign-in</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.data.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 font-medium">
                    {user.firstName} {user.lastName}
                    {isSelf(user) && (
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        (you)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.provider}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      disabled={isSelf(user)}
                      onChange={(event) =>
                        updateRole.mutate({
                          id: user.id,
                          role: event.target.value as UserRole,
                        })
                      }
                      className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm outline-none disabled:opacity-50"
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={isSelf(user)}
                      onClick={() =>
                        updateStatus.mutate({
                          id: user.id,
                          isActive: !user.isActive,
                        })
                      }
                      className="disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Badge
                        className={
                          user.isActive
                            ? "border-transparent bg-success/10 text-success"
                            : "border-transparent bg-destructive/10 text-destructive"
                        }
                      >
                        {user.isActive ? "Active" : "Deactivated"}
                      </Badge>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4">
            <Pagination
              page={data.meta.page}
              totalPages={data.meta.totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      )}

      <CreateAdminDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
