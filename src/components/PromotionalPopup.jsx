"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { usePopup } from "@/context/PopupContext";

export default function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { showPopup, closePopup } = usePopup();

  // Ensure component is mounted before accessing browser APIs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle manual trigger from context
  useEffect(() => {
    if (showPopup) {
      setIsOpen(true);
    }
  }, [showPopup]);

  useEffect(() => {
    if (!isMounted) return;

    // Don't show popup on learning pages or courses page (to avoid redirect loops)
    const hideOnPages = ['/learn', '/courses'];
    const shouldHide = hideOnPages.some(page => pathname.includes(page));
    
    if (shouldHide) {
      return;
    }

    // If popup is manually triggered, don't auto-show
    if (showPopup) {
      return;
    }

    // Check if user has already closed the popup in this session/tab
    const popupClosedKey = 'promo-popup-closed';
    let isClosed = false;
    try {
      isClosed = sessionStorage.getItem(popupClosedKey) === 'true';
    } catch (e) {
      // sessionStorage not available
    }

    // If popup was closed in this tab, don't show it
    if (isClosed) {
      return;
    }

    // Show popup after a short delay (better UX)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, isMounted, showPopup]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (!isMounted) return;

    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      if (isMounted) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, isMounted]);

  const handleClose = () => {
    setIsOpen(false);
    closePopup(); // Close via context as well
    // Remember that user closed it in this session/tab (only for auto-show, not manual trigger)
    if (isMounted && !showPopup) {
      try {
        sessionStorage.setItem('promo-popup-closed', 'true');
      } catch (e) {
        // sessionStorage not available
      }
    }
  };

  const handleImageClick = () => {
    handleClose();
    router.push('/courses');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="relative max-w-4xl w-full my-auto"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm flex items-center justify-center shadow-lg transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 text-gray-800" />
          </motion.button>

          {/* Image Container - Clickable */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleImageClick}
            className="cursor-pointer relative w-full"
          >
            <Image
              src="/New Year Discount.png"
              alt="New Year Sale - Special Discount"
              width={1200}
              height={1600}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

