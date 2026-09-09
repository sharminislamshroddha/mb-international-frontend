import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { NAVIGATION } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import Container from "./Container";
import Logo from "./Header/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo href="/" className="brightness-0 invert" />
            <p className="text-sm text-background/70">
              {SITE.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-background/70">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-background"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold">
              Account
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-background/70">
              <li>
                <Link
                  href={ROUTES.LOGIN}
                  className="hover:text-background"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.REGISTER}
                  className="hover:text-background"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CART}
                  className="hover:text-background"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.WISHLIST}
                  className="hover:text-background"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                {SITE.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                {SITE.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                {SITE.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 py-6 text-center text-xs text-background/60">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
