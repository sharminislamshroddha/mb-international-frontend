import { Loader2 } from "lucide-react";

interface Props {
  label?: string;
}

export default function Loading({ label = "Loading..." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
      <Loader2 className="h-6 w-6 animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
