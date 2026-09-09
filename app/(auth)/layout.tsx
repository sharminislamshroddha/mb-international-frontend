import { ReactNode } from "react";

import Logo from "@/components/layout/Header/Logo";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-muted/40 px-4 py-12">
      <Logo width={160} height={52} />

      {children}
    </div>
  );
}
