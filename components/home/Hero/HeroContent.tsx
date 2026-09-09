import Link from "next/link";

import { HERO_DATA } from "@/constants/home";

export default function HeroContent() {
  return (
    <div className="max-w-xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {HERO_DATA.subtitle}
      </p>

      <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
        {HERO_DATA.title}
      </h1>

      <p className="mt-6 text-lg leading-8 text-muted">
        {HERO_DATA.description}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={HERO_DATA.primaryButton.href}
          className="rounded-xl bg-primary px-8 py-4 font-medium text-white transition hover:opacity-90"
        >
          {HERO_DATA.primaryButton.text}
        </Link>

        <Link
          href={HERO_DATA.secondaryButton.href}
          className="rounded-xl border border-border px-8 py-4 font-medium transition hover:bg-gray-50"
        >
          {HERO_DATA.secondaryButton.text}
        </Link>
      </div>
    </div>
  );
}