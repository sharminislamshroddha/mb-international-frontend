import { ReactNode } from "react";

import Header from "./Header/Header";
import TopBar from "./Header/TopBar";
import Navbar from "./Header/Navbar";
import Footer from "./Footer";

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

      <Footer />
    </>
  );
}