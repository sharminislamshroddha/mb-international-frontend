import Logo from "./Logo";
import Container from "./Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo priority />

          <div className="text-sm text-gray-500">
            Search • Wishlist • Cart • Account
          </div>
        </div>
      </Container>
    </header>
  );
}