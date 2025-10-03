"use client";

import { motion } from "framer-motion";
import { CheckCircle, Play, Award, Users, Zap } from "lucide-react";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Main Diagonal Split Container */}
      <div className={styles.section}>
        {/* Pattern Overlay for Dark Section */}
        <div className={styles.patternOverlay}></div>

        {/* Content over background */}
        <div className="relative z-20 h-full">
          {/* Left Content - Text */}
          <div className="container mx-auto px-8 h-full flex items-start pt-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 rounded-full">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">About BVT Training</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Naval Excellence <br />
                <span className="text-blue-600">Since 1973</span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed">
                Trusted by naval forces worldwide for over 50 years, delivering 
                comprehensive vocational training that transforms careers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Meet Our Team
                </button>
                <button className="flex items-center justify-center gap-3 text-blue-600 hover:text-blue-700 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                  <span className="font-medium text-lg">Watch Our Story</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Horizontal Mission & Stats */}
          <div className="absolute bottom-16 right-8 left-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col lg:flex-row items-center justify-between gap-8"
            >
              {/* Mission Content */}
              <div className="flex-1 text-center">
                {/* Badge */}
                <div className="inline-flex  items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold mb-4">
                  <Zap className="w-5 h-5" />
                  Top Class Training
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  About Our Mission
                </h2>

                {/* Description */}
                <p className="text-blue-100 text-lg leading-relaxed ">
                  We are committed to excellence in naval vocational training, 
                  preparing professionals for successful maritime careers.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Stat 1 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center min-w-[140px]">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-blue-100 font-medium">Years Excellence</div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center min-w-[140px]">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">8.5K+</div>
                  <div className="text-sm text-blue-100 font-medium">Graduates</div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center min-w-[140px]">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-sm text-blue-100 font-medium">Courses</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
