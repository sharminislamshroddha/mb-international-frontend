"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/mutations/useRegister";

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goHome() {
    router.push("/");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    register.mutate(
      { firstName, lastName, email, password },
      { onSuccess: goHome }
    );
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
      <h1 className="mb-1 font-heading text-2xl font-bold">
        Create an account
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Join us to track orders and save your favorites.
      </p>

      <SocialAuthButtons onSuccess={goHome} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-sm font-medium">
              First name
            </label>
            <Input
              id="firstName"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last name
            </label>
            <Input
              id="lastName"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
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
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span className="text-xs text-muted-foreground">
            At least 8 characters.
          </span>
        </div>

        {register.isError && (
          <p className="text-sm text-destructive">
            {register.error?.message ?? "Registration failed."}
          </p>
        )}

        <Button type="submit" size="lg" disabled={register.isPending}>
          {register.isPending ? "Creating account..." : "Register"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
