"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Shield, Sparkles } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-blue-950" />
              </div>
            </motion.div>
            <div className="bg-blue-100 px-4 py-2 rounded-full border border-blue-200">
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Our Foundation</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              Mission, Vision & Values
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to BVT excellence is built on a solid foundation of core principles 
            that guide everything we do in preparing the next generation of BVT professionals.
          </p>
        </motion.div>

        {/* Mission, Vision, Values Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl lg:rounded-3xl p-8 border-2 border-blue-200 hover:border-yellow-400 hover:shadow-2xl transition-all overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-32 h-32 border-2 border-blue-600 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-blue-600 rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Header with Icon */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 flex-1 pr-4">Our Mission</h3>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                >
                  <Target className="w-8 h-8 text-blue-950" />
                </motion.div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                  To provide world-class BVT vocational training that empowers maritime professionals 
                  with the knowledge, skills, and leadership qualities necessary to excel in their careers 
                  and serve their nations with distinction.
                </p>
              </div>

              <div className="space-y-3">
                {["Excellence in Training", "Professional Development", "Career Advancement"].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
                    <span className="text-sm lg:text-base text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl lg:rounded-3xl p-8 text-white hover:shadow-2xl transition-all overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              {/* Header with Icon */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold flex-1 pr-4">Our Vision</h3>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                >
                  <Eye className="w-8 h-8 text-blue-950" />
                </motion.div>
              </div>
              
              <div className="mb-6">
                <p className="text-blue-100 leading-relaxed text-base lg:text-lg">
                  To be the global leader in BVT vocational education, recognized for our innovative 
                  training methods, outstanding faculty, and the exceptional success of our graduates 
                  in maritime operations worldwide.
                </p>
              </div>

              <div className="space-y-3">
                {["Global Leadership", "Innovation", "Graduate Success"].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
                    <span className="text-sm lg:text-base text-blue-100 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl lg:rounded-3xl p-8 border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-32 h-32 border-2 border-gray-400 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-gray-400 rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Header with Icon */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 flex-1 pr-4">Our Values</h3>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                >
                  <Heart className="w-8 h-8 text-blue-950" />
                </motion.div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                  Integrity, excellence, and service form the cornerstone of our educational philosophy, 
                  ensuring that every graduate embodies the highest standards of BVT professionalism.
                </p>
              </div>

              <div className="space-y-3">
                {["Integrity", "Excellence", "Service"].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
                    <span className="text-sm lg:text-base text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.div>
        </div>

        {/* Supporting Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { icon: Users, number: "8,500+", label: "Successful Graduates", color: "from-blue-500 to-blue-600" },
            { icon: Award, number: "95%", label: "Career Advancement Rate", color: "from-yellow-500 to-yellow-600" },
            { icon: Shield, number: "50+", label: "Years of Excellence", color: "from-green-500 to-green-600" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group text-center p-6 lg:p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium text-sm lg:text-base">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
