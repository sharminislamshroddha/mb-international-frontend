import CartButton from "./CartButton";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import WishlistButton from "./WishlistButton";
import MobileNavbar from "../MobileNavbar";
import UserMenu from "../UserMenu";
import Container from "../Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MobileNavbar />
            <Logo priority />
          </div>

          <div className="hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>

          <div className="flex items-center gap-5">
            <WishlistButton />
            <CartButton />
            <UserMenu />
          </div>
        </div>

        <div className="pb-4 md:hidden">
          <SearchBar />
        </div>
      </Container>
    </header>
  );
}
