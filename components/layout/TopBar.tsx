import Link from "next/link";
import { Phone, Truck } from "lucide-react";

import Container from "./Container";
import { SITE } from "@/constants/site";

export default function TopBar() {
  return (
    <div className="hidden border-b bg-slate-900 text-white lg:block">
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
            <Link href="/track-order">Track Order</Link>

            <Link href="/contact">Help</Link>

            <Link href="/login">Login</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}