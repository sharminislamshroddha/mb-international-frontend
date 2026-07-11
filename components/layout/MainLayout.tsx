import { ReactNode } from "react";

import TopBar from "./TopBar";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: Props) {
  return (
    <>
      <TopBar />

      <Header />

      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}