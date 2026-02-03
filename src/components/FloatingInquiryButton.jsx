"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import InquiryModal from "./InquiryModal";

export default function FloatingInquiryButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    const mql = window.matchMedia("(max-width: 768px)");
    mql.addEventListener("change", checkMobile);
    return () => mql.removeEventListener("change", checkMobile);
  }, []);

  if (!isMounted) return null;

  const glowScale = isMobile ? [0.95, 1.4, 1.4, 0.95] : [0.95, 2, 2, 0.95];
  const glowOpacity = isMobile ? [0, 0.35, 0, 0] : [0, 0.6, 0, 0];

  return (
    <>
      <motion.div
        className="fixed bottom-24 sm:bottom-28 right-3 sm:right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-br from-yellow-500 to-yellow-600 text-blue-950 rounded-full p-2.5 sm:p-3 md:p-4 shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center justify-center group border-2 border-white/20 cursor-pointer"
          aria-label="Submit Inquiry"
        >
          {/* Pulsating ring effect - smaller/less intense on mobile */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-400"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: glowScale,
              opacity: glowOpacity,
            }}
            transition={{
              duration: isMobile ? 2 : 2.5,
              repeat: Infinity,
              repeatDelay: isMobile ? 2.5 : 2,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-400"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: glowScale,
              opacity: glowOpacity,
            }}
            transition={{
              duration: isMobile ? 2 : 2.5,
              repeat: Infinity,
              repeatDelay: isMobile ? 2.5 : 2,
              ease: "easeOut",
              delay: 0.8,
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-400"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: glowScale,
              opacity: glowOpacity,
            }}
            transition={{
              duration: isMobile ? 2 : 2.5,
              repeat: Infinity,
              repeatDelay: isMobile ? 2.5 : 2,
              ease: "easeOut",
              delay: 1.6,
            }}
          />

          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />

          {/* Tooltip on hover - hidden on mobile so "Submit Inquiry" text is not always visible */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-900 to-blue-950 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-xl pointer-events-none border border-yellow-400/30 z-20 hidden md:block"
              >
                Submit Inquiry
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-blue-900"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

