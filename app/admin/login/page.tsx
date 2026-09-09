"use client";

import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/mutations/useLogin";
import { isAdminRole } from "@/lib/roles";
import { useAuthStore } from "@/store/auth-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useLogin();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const user = useAuthStore((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    if (hasHydrated && user && isAdminRole(user.role)) {
      router.replace("/admin");
    }
  }, [hasHydrated, user, router]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setAccessError("");

    login.mutate(
      { email, password },
      {
        onSuccess: ({ user: loggedInUser }) => {
          if (!isAdminRole(loggedInUser.role)) {
            clearAuth();
            setAccessError(
              "This account does not have admin access."
            );
            return;
          }

          router.push("/admin");
        },
      }
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-foreground px-4">
      <div className="w-full max-w-sm rounded-2xl bg-card p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-xl font-bold">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your admin credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {(accessError || login.isError) && (
            <p className="text-sm text-destructive">
              {accessError ||
                login.error?.message ||
                "Login failed."}
            </p>
          )}

          <Button type="submit" size="lg" disabled={login.isPending}>
            {login.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
