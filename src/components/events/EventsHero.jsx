"use client";

import { motion } from "framer-motion";
import { Sparkles, Award, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function EventsHero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative py-10 lg:py-16 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-yellow-500 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  {isMounted && <Sparkles className="w-6 h-6 text-blue-950" />}
                </div>
              </motion.div>
              <div className="bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-600/30">
                <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                  Maritime Events & Training
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Join Our Upcoming Events
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                & Training Sessions
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest BVT training events, conferences, workshops, and networking 
              opportunities. Connect with fellow professionals and advance your career.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-8 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center gap-2"
              >
                Browse All Events
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all shadow-lg flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                Featured Events
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
