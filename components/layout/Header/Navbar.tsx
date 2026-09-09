import Link from "next/link";

import Container from "../Container";
import { NAVIGATION } from "@/constants/navigation";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <Container>
        <ul className="flex h-14 items-center gap-8">
          {NAVIGATION.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-blue-700"
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