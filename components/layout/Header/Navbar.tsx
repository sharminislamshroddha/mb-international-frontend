import Link from "next/link";

import { NAVIGATION } from "@/constants/navigation";

import Container from "../Container";

export default function Navbar() {
  return (
    <nav className="hidden border-b border-border bg-background md:block">
      <Container>
        <ul className="flex h-12 items-center gap-8">
          {NAVIGATION.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
