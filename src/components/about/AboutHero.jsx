"use client";

import { motion } from "framer-motion";
import { Play, Users, Zap } from "lucide-react";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <div className={styles.section}>
      {/* Pattern Overlay */}
      <div className={styles.patternOverlay}></div>
      {/* Left-side gradient overlay so text is always readable over image (no white-on-white) */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(15,36,102,0.97) 0%, rgba(15,36,102,0.85) 35%, rgba(15,36,102,0.4) 60%, transparent 85%)',
        }}
        aria-hidden
      />

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-20 pb-12 sm:pt-24 sm:pb-16 md:pb-20">

        {/* LEFT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-4 sm:space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-100 px-3 py-1 sm:px-4 rounded-full"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            </motion.div>
            <span className="text-xs sm:text-sm font-semibold text-blue-600">
              About BVT Training
            </span>
          </motion.div>

          {/* Heading - responsive sizes, white text for contrast on overlay */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md"
          >
            Maritime Excellence <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-yellow-300"
            >
              Since 2025
            </motion.span>
          </motion.h1>
          {/* Description - light text for contrast */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed"
          >
            Trusted by BVT forces, we provide industry-ready vocational training designed to build skills, confidence, and lasting careers.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#leadership-team"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Users className="w-5 h-5" />
              Meet Our Team
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <Play className="w-5 h-5 ml-1" />
              </motion.div>
              <span className="font-medium text-lg">Watch Our Story</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* MISSION + STATS */}
        <div className={styles.statsWrapper}>
          <div className={styles.missionStatsContainer}>
            {/* LEFT: Mission Content */}
            <div className={styles.missionContent}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="inline-flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold mb-6"
              >
              <Zap className="w-5 h-5" />
              Top Class Training
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
              >
              About Our Mission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-blue-100 text-base sm:text-lg leading-relaxed"
              >
              We are committed to excellence in BVT vocational training, 
              preparing professionals for successful maritime careers.
              </motion.p>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
