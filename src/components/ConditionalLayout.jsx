"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LanguageToggle from "./LanguageToggle";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Hide navbar and footer for learning pages
  const isLearningPage = pathname.includes('/learn');
  
  if (isLearningPage) {
    return (
      <>
        <LanguageToggle />
        <main>{children}</main>
      </>
    );
  }
  
  return (
    <>
      <LanguageToggle />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}


