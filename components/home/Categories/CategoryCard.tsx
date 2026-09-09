import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types/category";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative h-20 w-20">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="80px"
              unoptimized
              className="object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {category.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}