import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function PageSection({
  children,
  className,
  containerClassName,
}: PageSectionProps) {
  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}