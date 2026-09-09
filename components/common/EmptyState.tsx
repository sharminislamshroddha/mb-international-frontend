interface Props {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "Nothing here yet",
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
      <p className="text-sm font-medium">{title}</p>

      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
