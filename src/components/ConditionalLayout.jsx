"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingInquiryButton from "./FloatingInquiryButton";
import PromotionalPopup from "./PromotionalPopup";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Hide navbar and footer for learning pages and test attempt pages
  const isLearningPage = pathname.includes('/learn');
  const isTestAttemptPage = pathname.includes('/test/attempt');
  
  // Full-screen pages without navbar/footer
  if (isLearningPage || isTestAttemptPage) {
    return (
      <>
        <main>{children}</main>
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingInquiryButton />
      <PromotionalPopup />
    </>
  );
}


