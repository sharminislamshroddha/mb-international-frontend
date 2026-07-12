import { ReactNode } from "react";

import Header from "./Header";
import TopBar from "./TopBar";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <TopBar />
      <Header />
      <main>{children}</main>
    </>
  );
}