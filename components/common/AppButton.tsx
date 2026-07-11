import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}

export default function AppButton({ children }: Props) {
  return (
    <Button
      className="
      rounded-xl
      px-6
      h-11
      font-medium
      "
    >
      {children}
    </Button>
  );
}