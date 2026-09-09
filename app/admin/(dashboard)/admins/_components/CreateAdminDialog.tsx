"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateAdminUser } from "@/hooks/mutations/useUserAdmin";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateAdminDialog({
  open,
  onOpenChange,
}: Props) {
  const createAdmin = useCreateAdminUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "SUPER_ADMIN">(
    "ADMIN"
  );

  function reset() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("ADMIN");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    createAdmin.mutate(
      { firstName, lastName, email, password, role },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Admin Account</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="text-sm font-medium"
              >
                First name
              </label>
              <Input
                id="firstName"
                required
                value={firstName}
                onChange={(event) =>
                  setFirstName(event.target.value)
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lastName"
                className="text-sm font-medium"
              >
                Last name
              </label>
              <Input
                id="lastName"
                required
                value={lastName}
                onChange={(event) =>
                  setLastName(event.target.value)
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium"
            >
              Temporary Password
            </label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(event) =>
                setRole(
                  event.target.value as "ADMIN" | "SUPER_ADMIN"
                )
              }
              className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          {createAdmin.isError && (
            <p className="text-sm text-destructive">
              {createAdmin.error?.message ??
                "Failed to create admin."}
            </p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={createAdmin.isPending}>
              {createAdmin.isPending
                ? "Creating..."
                : "Create Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
