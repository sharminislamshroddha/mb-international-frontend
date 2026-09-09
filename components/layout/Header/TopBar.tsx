"use client";

import { Phone, Truck } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { useAuthStore } from "@/store/auth-store";

import Container from "../Container";

export default function TopBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="hidden border-b border-border bg-foreground text-background lg:block">
      <Container>
        <div className="flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>{SITE.freeShippingText}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{SITE.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link href={ROUTES.FAQ} className="hover:text-secondary">
              Help
            </Link>

            {user ? (
              <Link
                href={ROUTES.PROFILE}
                className="hover:text-secondary"
              >
                My Account
              </Link>
            ) : (
              <Link
                href={ROUTES.LOGIN}
                className="hover:text-secondary"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
