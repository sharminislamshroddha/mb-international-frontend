import Container from "./Container";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <Container>
        <div className="flex h-20 items-center">
          <Logo priority />
        </div>
      </Container>
    </header>
  );
}