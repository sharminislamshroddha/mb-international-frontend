interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>

      {subtitle && (
        <p className="mt-2 text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}