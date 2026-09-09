import { ShieldCheck, Truck, Users } from "lucide-react";

import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/layout/Container";
import { SITE } from "@/constants/site";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description:
      "Every product we sell is sourced from reputable brands and backed by warranty support.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "We partner with dependable logistics providers to get your order to you on time.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Our support team is here to help you choose the right products and resolve issues fast.",
  },
];

export default function AboutPage() {
  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <div className="max-w-3xl">
        <h1 className="mb-4 font-heading text-3xl font-bold lg:text-4xl">
          About {SITE.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {SITE.description}
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="rounded-2xl border border-border p-6"
          >
            <value.icon className="h-8 w-8 text-primary" />
            <h3 className="mt-4 font-heading text-lg font-semibold">
              {value.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
