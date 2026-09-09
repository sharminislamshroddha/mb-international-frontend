interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = "Something went wrong. Please try again.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-sm text-danger">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-medium underline underline-offset-4"
        >
          Try again
        </button>
      )}
    </div>
  );
}
