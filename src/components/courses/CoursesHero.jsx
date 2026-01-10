"use client";

import { motion } from "framer-motion";
import { Play, Users, Award, Clock, Star, Sparkles, ArrowRight, BookOpen, TrendingUp, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function CoursesHero({ content }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Default content if none provided - Generic for both online and offline
  const defaultContent = {
    title: "BVT Training Courses",
    subtitle: "Master Maritime Skills with Expert-Led Programs",
    description: "Explore comprehensive maritime training programs designed for both online and offline learning. Access world-class instruction, hands-on training, and expert guidance to advance your career.",
    stats: [
      { number: "400+", label: "Training Courses" },
      { number: "8.5K+", label: "Active Students" },
      { number: "95%", label: "Success Rate" },
      { number: "24/7", label: "Support" }
    ],
    features: [
      { icon: "Clock", text: "Flexible Learning" },
      { icon: "Users", text: "Expert Instructors" },
      { icon: "Award", text: "Certificates" }
    ]
  };

  const heroContent = content || defaultContent;

  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-10 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-blue-950" />
              </div>
              {isMounted && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute -top-1 -right-1"
                >
                  <Award className="w-5 h-5 text-yellow-400" />
                </motion.div>
              )}
            </motion.div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">Premier Maritime Training</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight"
          >
            {heroContent.title || 'BVT Training Courses'}
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              {heroContent.subtitle || 'Master Naval Skills'}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl"
          >
            {heroContent.description || "Explore comprehensive Maritime training programs designed for both online and offline learning. Access world-class instruction, hands-on training, and expert guidance to advance your career."}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12"
          >
            {(heroContent.stats || defaultContent.stats).map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/20 hover:border-yellow-400/50 hover:bg-white/15 transition-all"
              >
                <div className="text-lg lg:text-xl xl:text-2xl font-bold text-white mb-1.5">{stat.number}</div>
                <div className="text-xs lg:text-sm text-blue-100 font-medium">{stat.label}</div>
                
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {(heroContent.features || defaultContent.features).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:border-yellow-400/50 transition-all"
              >
                {feature.icon === "Clock" && <Clock className="w-4 h-4 text-yellow-400" />}
                {feature.icon === "Users" && <Users className="w-4 h-4 text-yellow-400" />}
                {feature.icon === "Award" && <Award className="w-4 h-4 text-yellow-400" />}
                {feature.icon === "MapPin" && <MapPin className="w-4 h-4 text-yellow-400" />}
                <span className="text-sm font-medium text-white">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      {isMounted && (
        <>
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"
          ></motion.div>
        </>
      )}
    </section>
  );
}
