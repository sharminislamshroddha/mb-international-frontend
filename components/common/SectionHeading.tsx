import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
}: Props) {
  return (
    <div className={cn("mb-12 text-center", className)}>
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          {subtitle}
        </p>
      )}

      <h2 className="font-heading text-3xl font-bold lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}