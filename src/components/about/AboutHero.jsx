"use client";

import { motion } from "framer-motion";
import { Play, Users, Zap } from "lucide-react";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <div className={styles.section}>
      {/* Pattern Overlay */}
      <div className={styles.patternOverlay}></div>

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto px-6 pt-24 pb-20">

        {/* LEFT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-100 px-4 py-1 rounded-full"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Zap className="w-4 h-4 text-blue-600" />
            </motion.div>
            <span className="text-sm font-semibold text-blue-600">
              About BVT Training
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Maritime Excellence <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-blue-600"
            >
              Since 2025
            </motion.span>
          </motion.h1>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
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
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
              About Our Mission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-blue-100 text-lg leading-relaxed"
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
