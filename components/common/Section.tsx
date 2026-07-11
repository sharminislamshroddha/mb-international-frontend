import { ReactNode } from "react";
import Container from "@/components/layout/Container";

interface Props {
  children: ReactNode;
}

export default function Section({
  children,
}: Props) {
  return (
    <section className="py-24">
      <Container>
        {children}
      </Container>
    </section>
  );
}