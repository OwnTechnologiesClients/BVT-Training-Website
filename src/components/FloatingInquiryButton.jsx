"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import InquiryModal from "./InquiryModal";

export default function FloatingInquiryButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <motion.div
        className="fixed bottom-28 right-4 z-50"
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
          className="relative bg-gradient-to-br from-yellow-500 to-yellow-600 text-blue-950 rounded-full p-4 shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center justify-center group border-2 border-white/20 cursor-pointer"
          aria-label="Submit Inquiry"
        >
          <MessageCircle className="w-6 h-6" />
          
          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Tooltip on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-900 to-blue-950 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-xl pointer-events-none border border-yellow-400/30"
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

