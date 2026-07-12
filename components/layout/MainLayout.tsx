import { ReactNode } from "react";

import Header from "./Header";
import TopBar from "./TopBar";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />

      <main>{children}</main>
    </>
  );
}